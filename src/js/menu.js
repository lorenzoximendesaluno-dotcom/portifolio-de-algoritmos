/**
 * menu.js — Sidebar mobile: abrir/fechar com overlay e foco
 */

const OPEN_CLASS    = 'open';
const BODY_LOCK     = 'menu-open';

const getSidebar  = () => document.querySelector('.sidebar');
const getOverlay  = () => document.querySelector('.sidebar-overlay');
const getToggle   = () => document.getElementById('menuToggle');

const openMenu = () => {
  getSidebar()?.classList.add(OPEN_CLASS);
  getOverlay()?.classList.add(OPEN_CLASS);
  document.body.classList.add(BODY_LOCK);

  const toggle = getToggle();
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu lateral');
  }
};

const closeMenu = () => {
  getSidebar()?.classList.remove(OPEN_CLASS);
  getOverlay()?.classList.remove(OPEN_CLASS);
  document.body.classList.remove(BODY_LOCK);

  const toggle = getToggle();
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu lateral');
  }
};

const isMenuOpen = () => getSidebar()?.classList.contains(OPEN_CLASS) ?? false;

document.addEventListener('DOMContentLoaded', () => {
  const toggle  = getToggle();
  const overlay = getOverlay();
  const sidebar = getSidebar();

  toggle?.addEventListener('click', () => {
    isMenuOpen() ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  // Fecha ao clicar em link dentro da sidebar (mobile)
  sidebar?.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && e.target.closest('a, button')) {
      closeMenu();
    }
  });

  // Fecha ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) closeMenu();
  });
});
