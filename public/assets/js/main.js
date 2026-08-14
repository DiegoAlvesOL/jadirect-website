// Main, preenchimento de data-stat e composição do assunto do formulário


// Purpose    : Centraliza o preenchimento de [data-stat] e a composição do assunto do formulário de contato
// Consumed by: index.html, pages/about.html (Card 16 vai passar a consumir também em pages/contact.html)
// Layer      : Presentation - DOM logic

import { siteData } from '../../data/siteData.js';

/**
 * Preenche todo elemento [data-stat] da página com o valor correspondente em siteData.stats.
 * Elementos cujo atributo data-stat não existe em siteData.stats são ignorados, sem lançar erro.
 * @returns {void}
 */
export function fillStats() {
    const statElements = document.querySelectorAll('[data-stat]');

    statElements.forEach((element) => {
        const statKey = element.getAttribute('data-stat');
        const statValue = siteData.stats[statKey];

        if (statValue !== undefined) {
            element.textContent = statValue.toLocaleString('en-IE');
        }
    });
}

/**
 * Monta o assunto do e-mail de contato a partir do tipo de solicitação e do nome informado.
 * @param {string} type - Valor do seletor do formulário, "general" ou "quote"
 * @param {string} name - Nome completo informado no formulário
 * @returns {string} Assunto formatado para o envio
 */
export function buildFormSubject(type, name) {
    const subjectLabel = type === 'quote' ? 'Request a Quote' : 'General Enquiry';
    return `${subjectLabel}, from ${name}`;
}

document.addEventListener('DOMContentLoaded', () => {
    fillStats();
});