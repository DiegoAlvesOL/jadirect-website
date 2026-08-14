// siteData, dados estáticos consumidos por main.js (ex: estatísticas do carrossel)


// Purpose    : Dados estáticos consumidos por main.js (estatísticas do carrossel e da página About)
// Consumed by: public/assets/js/main.js
// Layer      : Data

/**
 * @typedef {Object} SiteStats
 * @property {number} avgMonthlyDeliveries - Média mensal de entregas
 * @property {number} avgMonthlyCollections - Média mensal de coletas
 * @property {number} walkaroundChecks - Total de checagens de veículo realizadas
 * @property {number} counties - Quantidade de condados atendidos na Irlanda
 */

/** @type {{ stats: SiteStats }} */
export const siteData = {
    stats: {
        avgMonthlyDeliveries: 31452,
        avgMonthlyCollections: 3177,
        walkaroundChecks: 675,
        counties: 26
    }
};