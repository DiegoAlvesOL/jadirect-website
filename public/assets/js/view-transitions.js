// View transitions, transição suave entre páginas via View Transitions API

/**
 * Purpose    : Detects native browser support for Cross-Document View Transitions
 *              and marks the persistent header as a named element, so it transitions
 *              smoothly instead of dissolving together with the rest of the page.
 * Consumed by: index.html and all pages in public/pages/
 * Layer      : Presentation, progressive enhancement, no dependency on other scripts
 */

const supportsCrossDocumentViewTransitions = 'onpageswap' in window;

if (supportsCrossDocumentViewTransitions) {
    document.documentElement.classList.add('view-transitions-supported');

    const siteHeader = document.querySelector('header');

    if (siteHeader) {
        siteHeader.style.viewTransitionName = 'site-header';
    }
}