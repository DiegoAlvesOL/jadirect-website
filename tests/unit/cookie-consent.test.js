// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredConsent, persistConsent, CONSENT_STATES } from '../../public/assets/js/cookie-consent.js';

describe('cookie-consent, máquina de estado', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('retorna pending quando não existe nenhuma decisão salva', () => {
        expect(getStoredConsent()).toBe(CONSENT_STATES.PENDING);
    });

    it('persiste e lê o estado accepted', () => {
        persistConsent(CONSENT_STATES.ACCEPTED);
        expect(getStoredConsent()).toBe(CONSENT_STATES.ACCEPTED);
    });

    it('persiste e lê o estado rejected', () => {
        persistConsent(CONSENT_STATES.REJECTED);
        expect(getStoredConsent()).toBe(CONSENT_STATES.REJECTED);
    });

    it('volta para pending quando o dado salvo está corrompido', () => {
        window.localStorage.setItem('jadirect_cookie_consent', 'not-valid-json');
        expect(getStoredConsent()).toBe(CONSENT_STATES.PENDING);
    });
});