/**
 * modal.js — Modal de visualização de código com syntax highlighting via Prism.js
 * Preserva quebras de linha e indentação corretamente.
 */

const PRISM_CDN  = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';
const PRISM_CSS  = `${PRISM_CDN}/themes/prism-tomorrow.min.css`;
const PRISM_CORE = `${PRISM_CDN}/prism.min.js`;
const PRISM_LANGS = {
  python: `${PRISM_CDN}/components/prism-python.min.js`,
  jsx:    `${PRISM_CDN}/components/prism-jsx.min.js`,
};

/* ── Estado ── */
let prismLoaded    = null;  // Promise singleton
let abortController = null;
let lastFocus      = null;

/* ── Elementos ── */
const getEl = (id) => document.getElementById(id);

/* ── Carregamento lazy do Prism ── */
const loadAsset = (tag, attrs) => new Promise((resolve, reject) => {
  const el = document.createElement(tag);
  Object.assign(el, attrs);
  el.onload  = resolve;
  el.onerror = () => reject(new Error(`Falha ao carregar: ${attrs.src || attrs.href}`));
  document.head.appendChild(el);
});

const loadPrism = () => {
  if (prismLoaded) return prismLoaded;

  prismLoaded = (async () => {
    await loadAsset('link', { rel: 'stylesheet', href: PRISM_CSS });
    await loadAsset('script', { src: PRISM_CORE });
    await Promise.all(
      Object.values(PRISM_LANGS).map((src) => loadAsset('script', { src }))
    );
  })();

  return prismLoaded;
};

/* ── Utilitários ── */
const normalize = (text) => text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

const detectLang = (path) => (path.endsWith('.jsx') ? 'jsx' : 'python');

/**
 * Destaca o código preservando quebras de linha (highlight linha a linha)
 */
const highlightCode = (codeEl, text, lang) => {
  codeEl.textContent = text;

  if (!window.Prism?.languages?.[lang]) return;

  const grammar = Prism.languages[lang];
  const highlighted = text
    .split('\n')
    .map((line) => (line ? Prism.highlight(line, grammar, lang) : ''))
    .join('\n');

  codeEl.innerHTML = highlighted;
};

/* ── API pública ── */
const openModal = () => {
  const overlay = getEl('codeModal');
  if (!overlay) return;

  lastFocus = document.activeElement;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Move foco para o botão de fechar
  requestAnimationFrame(() => {
    getEl('modalClose')?.focus();
  });
};

const closeModal = () => {
  const overlay = getEl('codeModal');
  if (!overlay) return;

  // Cancela fetch pendente
  abortController?.abort();
  abortController = null;

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  lastFocus?.focus?.();
};

/**
 * Carrega e exibe um arquivo de código no modal
 * @param {string} filePath - Caminho relativo ao arquivo
 */
const openCode = async (filePath) => {
  openModal();

  const titleEl  = getEl('modalTitle');
  const codeEl   = getEl('codeBlock');

  if (!titleEl || !codeEl) return;

  const lang = detectLang(filePath);

  titleEl.textContent  = filePath;
  codeEl.textContent   = 'Carregando…';
  codeEl.className     = `language-${lang}`;
  codeEl.closest('pre')?.setAttribute('class', `language-${lang}`);

  abortController = new AbortController();

  try {
    const response = await fetch(filePath, { signal: abortController.signal });

    if (!response.ok) throw new Error(`HTTP ${response.status}: arquivo não encontrado.`);

    const raw  = await response.text();
    const text = normalize(raw);

    await loadPrism();
    highlightCode(codeEl, text, lang);
  } catch (err) {
    if (err.name === 'AbortError') return;
    codeEl.textContent = `⚠️  ERRO: ${err.message}\n\nVerifique se o arquivo existe no repositório.`;
    codeEl.className   = '';
  } finally {
    abortController = null;
  }
};

/* ── Focus trap ── */
const trapFocus = (event) => {
  const overlay = getEl('codeModal');
  if (!overlay?.classList.contains('open')) return;

  if (event.key === 'Escape') {
    closeModal();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = overlay.querySelectorAll(
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
};

/* ── Inicialização ── */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = getEl('codeModal');
  const closeBtn = getEl('modalClose');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', trapFocus);
});

// Expõe globalmente para uso nos onclick inline dos cards
window.openCode  = openCode;
window.closeCode = closeModal;
