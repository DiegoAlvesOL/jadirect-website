// Nav menu, controla abrir/fechar do menu hambúrguer em telas pequenas

export function initNavMenu() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });
}

document.addEventListener('DOMContentLoaded', initNavMenu);