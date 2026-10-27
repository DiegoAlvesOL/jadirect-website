# J&A Direct Website

[![CI](https://github.com/DiegoAlvesOL/jadirect-website/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoAlvesOL/jadirect-website/actions/workflows/ci.yml)

## Overview

A real client project: the company website for J&A Direct Logistics, a logistics business based in Ireland. Live at [https://jadirect.ie](https://jadirect.ie).

1. Five pages (Home, About, Fleet, Contact, Legal) plus a Thank You page shown after the contact form is submitted, built with plain HTML, CSS and vanilla JavaScript, no framework.
2. Served by Nginx inside a Docker container and hosted on Railway.
3. Quality checks: HTML and CSS linting, Vitest unit tests, pa11y accessibility audits, broken link checks, and a GitHub Actions CI pipeline.
4. Security: Nginx security headers, including a Content Security Policy. The Web3Forms access key is injected with `envsubst` when the container starts and is never committed to the repository.
5. The contact form posts natively to Web3Forms, so the site needs no backend of its own.

## How I work

1. The work is split into numbered cards, each with a clear scope.
2. Every card gets its own branch (`feature/`, `chore/` or `docs/`), created before any file is changed.
3. CI runs on every change, and the branch is merged into `main` once it passes.
4. Visual refinements are made by replacing CSS files only, without editing the HTML.

## Running locally

Requirement: Docker installed.

```bash
docker compose up --build
```

The site is available at `http://localhost:8081`.

The contact form needs the environment variables `WEB3FORMS_ACCESS_KEY` and `WEB3FORMS_REDIRECT_URL`. Their values live in a local `.env` file, which is not versioned.

## Tests

```bash
npm run lint:html     # checks HTML syntax and best practices (htmlhint)
npm run lint:css      # checks CSS syntax and conventions (stylelint)
npm test              # unit tests for main.js, cookie-consent.js and nav-menu.js (Vitest)
npm run test:a11y     # accessibility audit on the five pages (pa11y-ci)
npm run test:links    # checks for broken internal links (linkinator)
```

The accessibility and link tests run against the local environment, so the container (`docker compose up`) must be running before you execute them.

## Project structure

```
jadirect-website/
├── public/                    # Everything served to the visitor
│   ├── index.html
│   ├── pages/
│   │   ├── about.html
│   │   ├── contact.html.template   # Contact template, Web3Forms access key injected at runtime
│   │   ├── fleet.html
│   │   ├── legal.html
│   │   └── thank-you.html
│   ├── assets/
│   │   ├── css/
│   │   │   ├── globals.css
│   │   │   ├── layout.css
│   │   │   └── pages/          # one CSS file per page
│   │   ├── js/
│   │   │   ├── main.js         # data-stat counters and contact form subject
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
├── .github/workflows/          # CI pipeline
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── package.json
```

The `public/` folder holds all the site content. Everything outside it is delivery infrastructure (Docker, CI, server configuration, testing tools).