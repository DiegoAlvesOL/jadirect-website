# J&A Direct Website

[![CI](https://github.com/DiegoAlvesOL/jadirect-website/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoAlvesOL/jadirect-website/actions/workflows/ci.yml)

## Sobre o projeto

Site institucional da J&A Direct Logistics, empresa de logística sediada na Irlanda. Cinco páginas principais (Home, About, Fleet, Contact, Legal), mais uma página de confirmação (Thank You) exibida após o envio do formulário de contato. Construído em HTML, CSS e JavaScript vanilla, containerizado com Docker e hospedado no Railway.

## Rodando localmente

Pré-requisito: Docker instalado.

```bash
docker compose up --build
```

O site fica disponível em `http://localhost:8081`.

## Testes

```bash
npm run lint:html     # valida sintaxe e boas práticas do HTML (htmlhint)
npm run lint:css      # valida sintaxe e padrões do CSS (stylelint)
npm test              # testes unitários da lógica de main.js, cookie-consent.js e nav-menu.js (Vitest)
npm run test:a11y     # auditoria de acessibilidade nas cinco páginas (pa11y-ci)
npm run test:links    # verifica links internos quebrados (linkinator)
```

Os testes de acessibilidade e de links rodam contra o ambiente local, então o container (`docker compose up`) precisa estar de pé antes de executá-los.

## Estrutura

```
jadirect-website/
├── public/                    # Tudo que é servido ao visitante
│   ├── index.html
│   ├── pages/
│   │   ├── about.html
│   │   ├── contact.html.template   # template do Contact, access key do Web3Forms injetada em runtime
│   │   ├── fleet.html
│   │   ├── legal.html
│   │   └── thank-you.html
│   ├── assets/
│   │   ├── css/
│   │   │   ├── globals.css
│   │   │   ├── layout.css
│   │   │   └── pages/          # um CSS por página
│   │   ├── js/
│   │   │   ├── main.js         # data-stat e composição do assunto do formulário
│   │   │   ├── cookie-consent.js
│   │   │   ├── nav-menu.js
│   │   │   ├── view-transitions.js
│   │   │   └── lightbox.js
│   │   └── images/
│   ├── data/
│   │   └── siteData.js
│   ├── sitemap.xml
│   ├── robots.txt
│   └── site.webmanifest
├── tests/
│   ├── unit/                   # Vitest
│   ├── a11y/                   # pa11y-ci
│   └── links/                  # linkinator
├── .github/workflows/          # pipeline de CI
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── package.json
```

A pasta `public/` concentra todo o conteúdo do site. Tudo fora dela é infraestrutura de entrega (Docker, CI, configuração de servidor, ferramentas de teste), e nunca deve ser tocado para resolver um pedido de conteúdo.

## Produção

Site em produção: [https://jadirect.ie](https://jadirect.ie)