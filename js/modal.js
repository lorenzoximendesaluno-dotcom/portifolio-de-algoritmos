/**
 * Modal de visualização de código — preserva quebras de linha e indentação.
 * Usa textContent (nunca innerHTML) para inserir o código-fonte.
 */

function normalizeLineEndings(text) {
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function openCode(filePath) {
    const modal = document.getElementById('codeModal');
    const title = document.getElementById('modalTitle');
    const codeEl = document.getElementById('codeBlock');
    const preEl = codeEl?.closest('pre');

    if (!modal || !title || !codeEl) return;

    title.textContent = filePath;
    codeEl.textContent = 'Carregando código...';

    const langClass = filePath.endsWith('.jsx') ? 'language-jsx' : 'language-python';
    codeEl.className = langClass;
    if (preEl) {
        preEl.className = langClass;
    }

    fetch(filePath)
        .then((response) => {
            if (!response.ok) throw new Error('Arquivo não encontrado');
            return response.text();
        })
        .then((rawText) => {
            const text = normalizeLineEndings(rawText);
            codeEl.textContent = text;

            if (typeof Prism !== 'undefined') {
                Prism.highlightElement(codeEl);
            }
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
