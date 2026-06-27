/**
 * utils.js — Funções utilitárias reutilizáveis
 */

/**
 * Debounce: executa fn apenas após `wait` ms de inatividade
 * @param {Function} fn
 * @param {number}   wait
 */
export const debounce = (fn, wait = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

/**
 * Throttle: garante que fn seja chamada no máximo 1x a cada `limit` ms
 * @param {Function} fn
 * @param {number}   limit
 */
export const throttle = (fn, limit = 200) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

/**
 * Normaliza texto para busca: minúsculas, sem acentos
 * @param {string} text
 * @returns {string}
 */
export const normalizeSearch = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
