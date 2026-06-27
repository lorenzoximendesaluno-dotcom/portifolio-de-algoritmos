/**
 * Painel de Atividades — interações do modal de código e menu mobile.
 * Prism.js é carregado sob demanda (lazy load) na primeira abertura do modal.
 */

const PRISM_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';

let prismReady = null;
let fetchController = null;
let lastFocusedElement = null;

const elModal = document.getElementById('codeModal');
const elModalTitle = document.getElementById('modalTitle');
const elCodeBlock = document.getElementById('codeBlock');
const elCloseBtn = document.getElementById('closeModalBtn');
const elMenuToggle = document.getElementById('menuToggle');
const elSidebarOverlay = document.getElementById('sidebarOverlay');

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Falha ao carregar syntax highlighting.'));
        document.body.appendChild(script);
    });
}

function loadPrism() {
    if (prismReady) return prismReady;

    prismReady = (async () => {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = 'https://cdnjs.cloudflare.com';
        document.head.appendChild(preconnect);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${PRISM_BASE}/themes/prism-tomorrow.min.css`;
        document.head.appendChild(link);

        await loadScript(`${PRISM_BASE}/prism.min.js`);
        await loadScript(`${PRISM_BASE}/components/prism-python.min.js`);
        await loadScript(`${PRISM_BASE}/components/prism-jsx.min.js`);
    })();

    return prismReady;
}

function abrirMenu() {
    document.body.classList.add('menu-aberto');
    elMenuToggle.setAttribute('aria-expanded', 'true');
    elMenuToggle.setAttribute('aria-label', 'Fechar menu lateral');
}

function fecharMenu() {
    document.body.classList.remove('menu-aberto');
    elMenuToggle.setAttribute('aria-expanded', 'false');
    elMenuToggle.setAttribute('aria-label', 'Abrir menu lateral');
}

function abrirModal() {
    lastFocusedElement = document.activeElement;
    elModal.classList.add('ativo');
    elModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    elCloseBtn.focus();
}

function fecharModal() {
    if (fetchController) {
        fetchController.abort();
        fetchController = null;
    }

    elModal.classList.remove('ativo');
    elModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
}

async function openCode(filePath) {
    abrirModal();
    elModalTitle.textContent = filePath;
    elCodeBlock.textContent = 'Carregando código...';
    elCodeBlock.className = filePath.endsWith('.jsx') ? 'language-jsx' : 'language-python';

    fetchController = new AbortController();

    try {
        const response = await fetch(filePath, { signal: fetchController.signal });

        if (!response.ok) {
            throw new Error('Arquivo não encontrado.');
        }

        const text = await response.text();
        elCodeBlock.textContent = text;

        await loadPrism();
        if (window.Prism) {
            window.Prism.highlightElement(elCodeBlock);
        }
    } catch (err) {
        if (err.name === 'AbortError') return;
        elCodeBlock.textContent = `⚠️ ERRO: ${err.message}\n\nArquivo ausente no repositório.`;
    } finally {
        fetchController = null;
    }
}

function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }

    if (event.key === 'Tab' && elModal.classList.contains('ativo')) {
        const focusable = elModal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}

document.addEventListener('click', (event) => {
    const codeBtn = event.target.closest('[data-file]');
    if (codeBtn) {
        event.preventDefault();
        openCode(codeBtn.dataset.file);
        return;
    }

    if (event.target === elModal) {
        fecharModal();
    }
});

elCloseBtn.addEventListener('click', fecharModal);
elModal.addEventListener('keydown', handleModalKeydown);

if (elMenuToggle) {
    elMenuToggle.addEventListener('click', () => {
        if (document.body.classList.contains('menu-aberto')) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    });
}

if (elSidebarOverlay) {
    elSidebarOverlay.addEventListener('click', fecharMenu);
}

document.querySelector('.sidebar')?.addEventListener('click', (event) => {
    if (window.innerWidth <= 820 && event.target.closest('a')) {
        fecharMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
        fecharMenu();
    }
});
