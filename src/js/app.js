/**
 * app.js — Entrada principal: busca, filtros e orquestração dos módulos
 */

import { debounce, normalizeSearch } from './utils.js';

/* ── Filtro e busca ── */
const initSearchAndFilter = () => {
  const searchInput = document.getElementById('searchInput');
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const cards       = document.querySelectorAll('.card[data-category]');
  const grid        = document.getElementById('cardsGrid');

  let activeFilter = 'all';

  const showEmpty = () => {
    let emptyEl = grid?.querySelector('.empty-state');
    if (!emptyEl) {
      emptyEl = document.createElement('p');
      emptyEl.className = 'empty-state';
      emptyEl.setAttribute('role', 'status');
      emptyEl.setAttribute('aria-live', 'polite');
      emptyEl.innerHTML = `
        <span class="empty-state__icon" aria-hidden="true">🔍</span>
        <strong class="empty-state__title">Nenhuma atividade encontrada</strong>
      `;
      grid?.appendChild(emptyEl);
    }
    emptyEl.hidden = false;
  };

  const hideEmpty = () => {
    grid?.querySelector('.empty-state')?.setAttribute('hidden', '');
  };

  const filterCards = () => {
    const query = normalizeSearch(searchInput?.value || '');
    let visible = 0;

    cards.forEach((card) => {
      const category  = card.dataset.category || '';
      const searchStr = normalizeSearch(card.dataset.search || card.textContent);

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !query || searchStr.includes(query);

      const show = matchesFilter && matchesSearch;
      card.hidden = !show;
      if (show) visible++;
    });

    visible === 0 ? showEmpty() : hideEmpty();
  };

  // Filtros
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.dataset.filter || 'all';
      filterCards();
    });
  });

  // Busca com debounce
  searchInput?.addEventListener('input', debounce(filterCards, 250));

  // Busca ao pressionar Enter
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') filterCards();
  });
};

/* ── Inicialização ── */
document.addEventListener('DOMContentLoaded', () => {
  initSearchAndFilter();
});
