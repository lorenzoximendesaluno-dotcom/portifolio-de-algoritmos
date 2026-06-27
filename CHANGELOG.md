# Changelog

Todas as alterações notáveis neste projeto serão documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [2.0.0] — 2026-06-27

### Adicionado

**Arquitetura**
- Nova estrutura de pastas `src/css/` e `src/js/` com separação clara de responsabilidades
- Todos os CSS divididos em módulos: `variables`, `reset`, `layout`, `components`, `animations`, `utilities`, `responsive`
- JavaScript reorganizado em módulos ES2022 nativos (`type="module"`)

**Design System**
- Arquivo `variables.css` com tokens completos: cores, tipografia, espaçamentos, bordas, sombras e transições
- Paleta dark totalmente compatível com tema light via `[data-theme="light"]`
- Custom Properties (`--color-*`, `--space-*`, `--font-*`, etc.) usadas em todo o projeto
- Escala tipográfica com variáveis `clamp()` para fluidez

**HTML / Semântica**
- Reescrita completa do `index.html` com HTML5 semântico
- Uso correto de `<header>`, `<main>`, `<aside>`, `<footer>`, `<article>`, `<section>`, `<figure>`, `<address>`
- Hierarquia de títulos corrigida: único `<h1>` na sidebar, `<h2>` nos cards
- Remoção de `<div>` e nesting desnecessários

**SEO**
- `<title>` otimizado com padrão `Página — Autor | Site`
- Metatags `description`, `keywords`, `author`, `robots`, `color-scheme`
- Open Graph completo (`og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`)
- Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`)
- `<link rel="canonical">` explícito
- JSON-LD (Schema.org `ProfilePage`) com dados estruturados do autor
- `theme-color` dual (dark + light) via `media`
- `sitemap.xml` atualizado
- `robots.txt` limpo e sem regras duplicadas
- `manifest.webmanifest` para PWA

**Performance**
- Scripts convertidos para `type="module"` (defer implícito, sem render-blocking)
- Prism.js carregado somente na primeira abertura do modal (lazy load real)
- `AbortController` para cancelar fetches ao fechar o modal
- `preconnect` + `dns-prefetch` para CDN do Prism
- Loader de página com fallback de 3s
- Barra de progresso com `throttle` (50ms) para não saturar o event loop
- Scroll events com `{ passive: true }`
- CSS inline mínimo para evitar FOUC de tema

**Acessibilidade (WCAG AA)**
- Skip link "Pular para conteúdo principal"
- `aria-label`, `aria-pressed`, `aria-expanded`, `aria-hidden`, `aria-modal`, `aria-live` em todos os componentes interativos
- Focus trap funcional no modal (Tab + Shift+Tab)
- Retorno de foco ao fechar o modal para o elemento que o abriu
- `aria-valuenow/min/max` na barra de progresso
- `role="search"` no container de busca
- `role="group"` nos botões de filtro
- `role="note"` nos badges
- Botões com `aria-label` descritivos (incluindo os links de arquivo)
- Tecla Escape fecha modal e sidebar
- `prefers-reduced-motion` respeitado globalmente

**UI/UX**
- Loader animado com spinner e texto
- Linha decorativa gradiente topo de cada card (visível no hover)
- Cards com `border-radius` maior e hover com `box-shadow` colorida
- Badges com variantes visuais distintas por categoria (azul/verde)
- Botão back-to-top circular com sombra colorida
- Sidebar com scrollbar customizada e discreta
- Empty state visual quando busca não retorna resultados
- Modal com animação `slideUp` na abertura

**Responsividade**
- Breakpoints: 320px, 375px, 480px, 768px, 1024px, 1280px, 1600px, 2560px
- Grid de cards com `clamp()` para preenchimento natural
- Sidebar mobile como drawer com overlay e bloqueio de scroll do body
- Modal em tela cheia (`border-radius: 0`) abaixo de 480px

**Segurança**
- Todos os links externos com `rel="noopener noreferrer"`
- Nenhuma injeção de HTML direta com `innerHTML` em conteúdo externo
- Uso de `textContent` para inserir código antes do highlight

### Removido

- CSS minificados separados (`main.min.css`, `cards.min.css`, `modal.min.css`, `responsive.min.css`) — substituídos pelos módulos fonte organizados
- JS minificados (`main.min.js`, `modal.min.js`, `filters.min.js`, `theme.min.js`) — substituídos por módulos ES2022
- `REFACTOR.md` do projeto anterior
- `!important` em seletores de CSS
- Variáveis globais no JavaScript
- Duplicação de regras CSS entre `style.css` e os arquivos min
- `style.css` monolítico da versão anterior

### Corrigido

- Conflito entre `openCode`/`closeCode` definidos em dois arquivos JS diferentes
- Modal não fechava ao clicar no overlay em todos os casos
- Sidebar não era ocultável no resize para desktop
- `aria-hidden="false"` não era removido ao fechar o modal
- Duplicação do bloco `User-agent: *` no `robots.txt`

---

## [1.x] — 2026-06-27 (versão anterior)

Versão inicial publicada no GitHub Pages com CSS modular minificado, tema dark/light, modal de código com Prism.js, busca e filtros, sidebar responsiva e SEO básico.
