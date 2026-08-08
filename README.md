# JADirect Website

[![CI](https://github.com/DiegoAlvesOL/jadirect-website/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoAlvesOL/jadirect-website/actions/workflows/ci.yml)

## Sobre o projeto

Site institucional da JADirect Logistics, empresa de logística sediada na Irlanda. Cinco páginas estáticas (Home, About, Fleet, Contact, Legal), construídas em HTML, CSS e JavaScript vanilla, containerizadas com Docker e hospedadas no Railway.

## Rodando localmente

Pré-requisito: Docker instalado.

```bash
docker compose up --build
```

O site fica disponível em `http://localhost:8081`.

## Estrutura

```
jadirect-website/
├── public/             # Conteúdo servido ao visitante (HTML, CSS, JS, imagens)
├── tests/              # Testes automatizados (unitários, acessibilidade, links)
├── .github/            # Workflows de CI
├── Dockerfile          # Definição da imagem de produção
├── docker-compose.yml  # Ambiente local
└── nginx.conf          # Configuração do servidor
```

A pasta `public/` concentra tudo que é conteúdo do site. Tudo fora dela é infraestrutura de entrega (Docker, CI, configuração de servidor).

## Produção

Link de produção: a ser definido na Fase 5 (deploy no Railway).