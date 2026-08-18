// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { initNavMenu } from '../../public/assets/js/nav-menu.js';

function renderNav() {
    document.body.innerHTML = `
        <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
            <span class="nav-toggle-icon"></span>
        </button>
        <ul class="nav-links" id="primary-nav">
            <li><a href="#services">Services</a></li>
            <li><a href="about.html">About</a></li>
        </ul>
    `;
}

describe('nav-menu', () => {
    beforeEach(() => {
        renderNav();
        initNavMenu();
    });

    it('abre o menu ao clicar no botão', () => {
        const toggle = document.getElementById('nav-toggle');
        const nav = document.getElementById('primary-nav');

        toggle.click();

        expect(nav.classList.contains('is-open')).toBe(true);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });

    it('fecha o menu ao clicar em um link dentro dele', () => {
        const toggle = document.getElementById('nav-toggle');
        const nav = document.getElementById('primary-nav');

        toggle.click();
        expect(nav.classList.contains('is-open')).toBe(true);

        nav.querySelector('a').click();

        expect(nav.classList.contains('is-open')).toBe(false);
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('fecha o menu e devolve o foco ao botão ao apertar Esc', () => {
        const toggle = document.getElementById('nav-toggle');
        const nav = document.getElementById('primary-nav');

        toggle.click();
        expect(nav.classList.contains('is-open')).toBe(true);

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(nav.classList.contains('is-open')).toBe(false);
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        expect(document.activeElement).toBe(toggle);
    });

    it('não lança erro se o botão ou a nav não existirem no DOM', () => {
        document.body.innerHTML = '';

        expect(() => initNavMenu()).not.toThrow();
    });
});