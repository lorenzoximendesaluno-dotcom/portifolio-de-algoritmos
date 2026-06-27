/**
 * scroll.js — Barra de progresso de leitura e botão "Voltar ao topo"
 */

import { throttle } from './utils.js';

const initScrollProgress = () => {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  const updateProgress = throttle(() => {
    const main = document.querySelector('.main-content');
    if (!main) return;

    const { scrollTop, scrollHeight, clientHeight } = main;
    const total = scrollHeight - clientHeight;
    const pct   = total > 0 ? Math.round((scrollTop / total) * 100) : 0;

    bar.style.width = `${pct}%`;
    bar.setAttribute('aria-valuenow', pct);
  }, 50);

  document.querySelector('.main-content')?.addEventListener('scroll', updateProgress, { passive: true });
};

const initBackToTop = () => {
  const btn  = document.getElementById('backToTop');
  const main = document.querySelector('.main-content');
  if (!btn || !main) return;

  const toggle = throttle(() => {
    btn.classList.toggle('visible', main.scrollTop > 300);
  }, 100);

  main.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initBackToTop();
});
