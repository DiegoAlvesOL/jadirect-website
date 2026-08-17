// Cookie consent banner, máquina de estado (pending, accepted, rejected) e persistência via localStorage

/**
 * Purpose    : Controla o banner de consentimento de cookies, com máquina de estado
 *              (pending, accepted, rejected), persistência da escolha via localStorage,
 *              e reabertura do painel pelo link "Cookie Settings" do rodapé.
 * Consumed by: index.html, pages/about.html, pages/fleet.html, pages/contact.html, pages/legal.html
 * Layer      : Presentation - DOM logic
 */

const CONSENT_STORAGE_KEY = 'jadirect_cookie_consent';

export const CONSENT_STATES = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
};

/**
 * Lê a escolha de consentimento persistida no localStorage.
 * @returns {string} Um valor de CONSENT_STATES. PENDING quando não há escolha salva ou o dado está corrompido.
 */
export function getStoredConsent() {
    const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (rawValue === null) {
        return CONSENT_STATES.PENDING;
    }

    try {
        const parsedValue = JSON.parse(rawValue);

        if (parsedValue.status === CONSENT_STATES.ACCEPTED || parsedValue.status === CONSENT_STATES.REJECTED) {
            return parsedValue.status;
        }

        return CONSENT_STATES.PENDING;
    } catch (error) {
        return CONSENT_STATES.PENDING;
    }
}

/**
 * Persiste a escolha de consentimento no localStorage, junto com o timestamp da decisão.
 * @param {string} status - CONSENT_STATES.ACCEPTED ou CONSENT_STATES.REJECTED
 * @returns {void}
 */
export function persistConsent(status) {
    const payload = {
        status,
        decidedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
}

let bannerElement = null;
let previouslyFocusedElement = null;

/**
 * Calcula o caminho relativo correto para a âncora de cookies em legal.html,
 * dependendo se a página atual está na raiz de public/ ou dentro de public/pages/.
 * @returns {string} O href relativo para "legal.html#cookies"
 */
function getLegalCookiesHref() {
    const isInsidePagesFolder = window.location.pathname.includes('/pages/');
    return isInsidePagesFolder ? 'legal.html#cookies' : 'pages/legal.html#cookies';
}

/**
 * Constrói o markup do banner de consentimento, com role="dialog" e os três botões de ação.
 * @returns {HTMLElement} O elemento raiz do banner, ainda não anexado ao DOM.
 */
function buildBannerElement() {
    const banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.setAttribute('aria-describedby', 'cookie-consent-description');
    banner.setAttribute('aria-live', 'polite');

    banner.innerHTML = `
        <div class="cookie-consent-content">
            <h2 id="cookie-consent-title" class="cookie-consent-title">Cookie Preferences</h2>
            <p id="cookie-consent-description" class="cookie-consent-description">
                We use cookies to understand how our site is used. Analytics cookies are only loaded after you accept.
                Read more in our <a href="${getLegalCookiesHref()}">Cookie Policy</a>.
            </p>
            <div class="cookie-consent-actions">
                <button type="button" class="cookie-consent-btn cookie-consent-btn-manage" data-action="manage">Manage Preferences</button>
                <button type="button" class="cookie-consent-btn cookie-consent-btn-reject" data-action="reject">Reject</button>
                <button type="button" class="cookie-consent-btn cookie-consent-btn-accept" data-action="accept">Accept</button>
            </div>
            <div class="cookie-consent-details" data-details hidden>
                <p>Only one category of cookie is used on this site, analytics (Google Analytics 4), which measures visits and page views. No cookie is set until you accept.</p>
            </div>
        </div>
    `;

    return banner;
}

/**
 * Retorna a lista de elementos focáveis dentro do banner, usada pelo focus trap.
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
function getFocusableElements(container) {
    return Array.from(container.querySelectorAll('button, a[href]'));
}

/**
 * Trata Tab, Shift+Tab e Escape enquanto o banner está aberto, mantendo o foco preso dentro dele.
 * @param {KeyboardEvent} event
 * @returns {void}
 */
function trapFocus(event) {
    if (bannerElement === null) {
        return;
    }

    if (event.key === 'Escape') {
        hideBanner();
        return;
    }

    if (event.key !== 'Tab') {
        return;
    }

    const focusableElements = getFocusableElements(bannerElement);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}

/**
 * Trata clique nos três botões de ação do banner, accept, reject e manage.
 * @param {MouseEvent} event
 * @returns {void}
 */
function handleBannerClick(event) {
    const action = event.target.getAttribute('data-action');

    if (action === 'accept') {
        persistConsent(CONSENT_STATES.ACCEPTED);
        hideBanner();
        return;
    }

    if (action === 'reject') {
        persistConsent(CONSENT_STATES.REJECTED);
        hideBanner();
        return;
    }

    if (action === 'manage') {
        const detailsElement = bannerElement.querySelector('[data-details]');
        detailsElement.hidden = !detailsElement.hidden;
    }
}

/**
 * Exibe o banner, anexando ao body, prendendo o foco e guardando o elemento que tinha foco antes.
 * @returns {void}
 */
function showBanner() {
    if (bannerElement !== null) {
        return;
    }

    previouslyFocusedElement = document.activeElement;
    bannerElement = buildBannerElement();
    document.body.appendChild(bannerElement);
    document.addEventListener('keydown', trapFocus);
    bannerElement.addEventListener('click', handleBannerClick);

    const acceptButton = bannerElement.querySelector('[data-action="accept"]');
    acceptButton.focus();
}

/**
 * Fecha e remove o banner do DOM, devolvendo o foco para o elemento anterior.
 * @returns {void}
 */
function hideBanner() {
    if (bannerElement === null) {
        return;
    }

    document.removeEventListener('keydown', trapFocus);
    bannerElement.remove();
    bannerElement = null;

    if (previouslyFocusedElement !== null) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
}

/**
 * Reabre o painel de preferências, chamada pelo link "Cookie Settings" do rodapé.
 * Funciona independentemente de já existir uma decisão salva.
 * @returns {void}
 */
export function reopenCookiePreferences() {
    hideBanner();
    showBanner();
}

/**
 * Inicializa o banner, exibindo-o só quando não houver decisão registrada,
 * e vincula o link "Cookie Settings" do rodapé para reabrir o painel a qualquer momento.
 * @returns {void}
 */
export function initCookieConsent() {
    const currentConsent = getStoredConsent();

    if (currentConsent === CONSENT_STATES.PENDING) {
        showBanner();
    }

    const settingsLink = document.getElementById('cookie-settings-link');

    if (settingsLink !== null) {
        settingsLink.addEventListener('click', (event) => {
            event.preventDefault();
            reopenCookiePreferences();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCookieConsent();
});