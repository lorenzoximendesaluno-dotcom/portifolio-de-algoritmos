/**
 * theme.js — Alternância dark/light com persistência em localStorage
 */

const STORAGE_KEY = 'portfolio-theme';
const DARK  = 'dark';
const LIGHT = 'light';

const ICONS = {
  [DARK]:  '🌙',
  [LIGHT]: '☀️',
};

const LABELS = {
  [DARK]:  'Alternar para tema claro',
  [LIGHT]: 'Alternar para tema escuro',
};

/**
 * Retorna o tema preferido: localStorage → prefers-color-scheme → dark
 */
const getPreferredTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === DARK || stored === LIGHT) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
};

/**
 * Aplica o tema no documento
 */
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const icon = btn.querySelector('.theme-icon');
  if (icon) icon.textContent = ICONS[theme];
  btn.setAttribute('aria-label', LABELS[theme]);
  btn.setAttribute('aria-pressed', theme === LIGHT ? 'true' : 'false');
};

/**
 * Inicializa o tema e o botão de alternância
 */
const initTheme = () => {
  applyTheme(getPreferredTheme());

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || DARK;
    applyTheme(current === DARK ? LIGHT : DARK);
  });
};

// Aplica o tema imediatamente (antes do DOMContentLoaded) para evitar flash
applyTheme(getPreferredTheme());

document.addEventListener('DOMContentLoaded', initTheme);
