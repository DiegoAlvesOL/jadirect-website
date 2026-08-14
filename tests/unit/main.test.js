// @vitest-environment jsdom
// Purpose    : Testes unitários de main.js, cobrindo fillStats() e buildFormSubject()
// Consumed by: npm run test (Vitest)
// Layer      : Tests - Unit

import { describe, it, expect, beforeEach } from 'vitest';
import { fillStats, buildFormSubject } from '../../public/assets/js/main.js';
import { siteData } from '../../public/data/siteData.js';

describe('buildFormSubject', () => {
    it('monta o assunto para uma solicitação de orçamento', () => {
        const subject = buildFormSubject('quote', 'John Doe');
        expect(subject).toBe('Request a Quote, from John Doe');
    });

    it('monta o assunto para uma dúvida geral', () => {
        const subject = buildFormSubject('general', 'John Doe');
        expect(subject).toBe('General Enquiry, from John Doe');
    });
});

describe('fillStats', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('preenche um elemento cujo data-stat existe em siteData.stats', () => {
        document.body.innerHTML = '<span data-stat="avgMonthlyDeliveries">0</span>';

        fillStats();

        const element = document.querySelector('[data-stat="avgMonthlyDeliveries"]');
        expect(element.textContent).toBe(siteData.stats.avgMonthlyDeliveries.toLocaleString('en-IE'));
    });

    it('mantém o conteúdo original quando o data-stat não existe em siteData.stats', () => {
        document.body.innerHTML = '<span data-stat="nonExistentStat">0</span>';

        fillStats();

        const element = document.querySelector('[data-stat="nonExistentStat"]');
        expect(element.textContent).toBe('0');
    });
});