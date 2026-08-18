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


export function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length === 0) {
        return;
    }

    if (prefersReducedMotion) {
        revealElements.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => observer.observe(el));
}


/**
 * Vincula o preenchimento do campo oculto "subject" do formulário de contato,
 * a partir do tipo de solicitação e do nome informado, antes do POST nativo para o Web3Forms.
 * @returns {void}
 */
function bindContactFormSubject() {
    const form = document.getElementById('contact-form');

    if (form === null) {
        return;
    }

    form.addEventListener('submit', () => {
        const enquiryType = document.getElementById('enquiry-type').value;
        const fullName = document.getElementById('contact-name').value;
        const subjectField = document.getElementById('form-subject');

        subjectField.value = buildFormSubject(enquiryType, fullName);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fillStats();
    initScrollReveal();
    bindContactFormSubject();
});