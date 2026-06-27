# ⚙️ Portfólio de Algoritmos — Lorenzo Ximendes

> Painel acadêmico documentando a evolução técnica em Algoritmos e Programação — UNIPAMPA, Turma 80A.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-3fb950?logo=github)](https://lorenzoximendesaluno-dotcom.github.io/portifolio-de-algoritmos/)
[![HTML5](https://img.shields.io/badge/HTML5-Semântico-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modular-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![WCAG](https://img.shields.io/badge/WCAG-AA-005a9c)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📋 Descrição

Portfólio estático publicado no GitHub Pages que centraliza todas as atividades da disciplina de Algoritmos: exercícios resolvidos em Python, projetos práticos de engenharia e análises comparativas de IAs.

**Funcionalidades:**
- Busca em tempo real por exercícios e projetos
- Filtro por categoria (Exercícios / Projetos)
- Visualizador de código com syntax highlighting (Prism.js)
- Tema dark/light com persistência
- Design responsivo (320px → 4K)
- Loader e animações suaves

---

## 🛠️ Tecnologias

| Camada       | Tecnologia                         |
|:-------------|:-----------------------------------|
| Marcação     | HTML5 semântico + ARIA             |
| Estilo       | CSS3 modular (Design System)       |
| Interação    | JavaScript ES2022 (módulos nativos)|
| Highlighting | Prism.js 1.29 (carregamento lazy)  |
| Hospedagem   | GitHub Pages                       |

---

## 📁 Estrutura

```
portifolio-de-algoritmos/
├── src/
│   ├── css/
│   │   ├── variables.css   # Design tokens (cores, espaços, tipografia)
│   │   ├── reset.css       # Normalização base
│   │   ├── layout.css      # Header, sidebar, main, footer
│   │   ├── components.css  # Cards, modal, busca, badges
│   │   ├── animations.css  # Micro-animações e loader
│   │   ├── utilities.css   # Classes utilitárias
│   │   └── responsive.css  # Breakpoints 320px → 4K
│   └── js/
│       ├── app.js          # Entrada principal: busca e filtros
│       ├── modal.js        # Visualizador de código
│       ├── menu.js         # Sidebar mobile
│       ├── scroll.js       # Progresso e back-to-top
│       ├── loader.js       # Loader de página
│       ├── theme.js        # Dark/light mode
│       └── utils.js        # debounce, throttle, normalizeSearch
├── 10-exercicios/
├── 15-exercicios/
├── evolucao-tecnica/
├── exercicios-em-papel/
├── modularizacao/
├── portal-alegrete/
├── portal-alegrete-novo/
├── problema-1/
├── problema-2/
├── problema-de-engenharia/
├── relato-entrevistas/
├── index.html
├── 404.html
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── README.md
└── CHANGELOG.md
```

---

## 🚀 Como executar localmente

O projeto é 100% estático — sem build, sem dependências npm.

```bash
# Clone o repositório
git clone https://github.com/lorenzoximendesaluno-dotcom/portifolio-de-algoritmos.git
cd portifolio-de-algoritmos

# Opção A: Live Server (VS Code)
# Instale a extensão "Live Server" e clique em "Go Live"

# Opção B: Python 3
python -m http.server 8000
# Acesse: http://localhost:8000

# Opção C: Node.js (npx)
npx serve .
# Acesse: http://localhost:3000
```

> ⚠️ **Não abra o `index.html` diretamente no navegador** — o `fetch()` para carregar os arquivos de código requer um servidor HTTP (política CORS).

---

## 🌐 Deploy no GitHub Pages

O projeto já está configurado para GitHub Pages via arquivo `.nojekyll`.

1. No repositório, vá em **Settings → Pages**
2. Em **Source**, selecione `main` / `root`
3. Aguarde o deploy (≈ 1 min)
4. Acesse: `https://<usuario>.github.io/portifolio-de-algoritmos/`

---

## 🤝 Como contribuir

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-melhoria`
3. Commit suas alterações: `git commit -m 'feat: descreva a melhoria'`
4. Push: `git push origin feat/minha-melhoria`
5. Abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

<p align="center">
  Feito por <strong>Lorenzo Ximendes</strong> · UNIPAMPA Alegrete · 2026
</p>
