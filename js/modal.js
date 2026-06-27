/**
 * Modal de visualização de código — preserva quebras de linha e indentação.
 * Insere o código com textContent; o highlight do Prism é linha a linha
 * para não colapsar os \n (bug do highlightElement em blocos multilinha).
 */

function normalizeLineEndings(text) {
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function getLanguageInfo(filePath) {
    if (filePath.endsWith('.jsx')) {
        return { className: 'language-jsx', lang: 'jsx' };
    }
    return { className: 'language-python', lang: 'python' };
}

/**
 * Aplica syntax highlight preservando quebras de linha.
 * Prism.highlightElement() colapsa linhas; highlight() linha a linha corrige isso.
 */
function renderCode(codeEl, text, lang) {
    codeEl.textContent = text;

    if (typeof Prism === 'undefined' || !Prism.languages[lang]) {
        return;
    }

    const grammar = Prism.languages[lang];
    const lines = text.split('\n');

    const highlighted = lines
        .map((line) => (line.length === 0 ? '' : Prism.highlight(line, grammar, lang)))
        .join('\n');

    codeEl.innerHTML = highlighted;
}

function openCode(filePath) {
    const modal = document.getElementById('codeModal');
    const title = document.getElementById('modalTitle');
    const codeEl = document.getElementById('codeBlock');
    const preEl = codeEl?.closest('pre');

    if (!modal || !title || !codeEl) return;

    title.textContent = filePath;
    codeEl.textContent = 'Carregando código...';

    const { className, lang } = getLanguageInfo(filePath);
    codeEl.className = className;
    if (preEl) {
        preEl.className = className;
    }

    fetch(filePath)
        .then((response) => {
            if (!response.ok) throw new Error('Arquivo não encontrado');
            return response.text();
        })
        .then((rawText) => {
            renderCode(codeEl, normalizeLineEndings(rawText), lang);
        })
        .catch((err) => {
            codeEl.textContent = `ERRO: ${err.message}\n\nArquivo ausente no repositório.`;
        });

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function closeCode() {
    const modal = document.getElementById('codeModal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('codeModal');
    if (!modal) return;

    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeCode();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeCode();
    });
});
