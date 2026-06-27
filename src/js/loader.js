/**
 * loader.js — Oculta o loader de página após carregamento
 */

const hideLoader = () => {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  loader.classList.add('hidden');
  // Remove do DOM após transição para não afetar a árvore de acessibilidade
  loader.addEventListener('transitionend', () => loader.remove(), { once: true });
};

// Oculta no load completo (inclui imagens e scripts)
window.addEventListener('load', () => {
  // Pequeno delay intencional para transição suave
  setTimeout(hideLoader, 200);
});

// Fallback: oculta após 3s mesmo se load não disparar
setTimeout(hideLoader, 3000);
