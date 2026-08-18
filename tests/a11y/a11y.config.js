// Purpose    : Configuration for pa11y-ci accessibility audits.
// Consumed by: npm run test:a11y (and later the CI pipeline, Card 6)
// Layer      : Testing / Quality assurance

module.exports = {
    defaults: {
        timeout: 30000,
        wait: 1000,
        runners: ["axe", "htmlcs"],
        includeWarnings: true,
        chromeLaunchConfig: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
        ignore: [
            // O axe-core marca color-contrast como "incomplete" (nao confirmado) sempre que
            // o texto esta sobre background-image ou gradient, por nao conseguir amostrar o
            // pixel renderizado com seguranca. Comportamento documentado do axe-core, nao e
            // falso positivo do nosso CSS. O htmlcs continua verificando contraste normalmente.
            "color-contrast",

            // #enquiry-type (Contact) tem so duas opcoes sem relacao hierarquica entre si
            // (General Enquiry / Request a Quote). Forcar um <optgroup> criaria agrupamento
            // artificial so para silenciar o aviso, piorando a experiencia real de leitor de
            // tela. H85 (WCAG 1.3.1) e uma tecnica sugerida, nao um requisito.
            "WCAG2AA.Principle1.Guideline1_3.1_3_1.H85.2",

            // O banner de cookies usa position:fixed de proposito (Card 18), para ficar
            // sempre visivel. O htmlcs sinaliza qualquer position:fixed como risco generico
            // de reflow (WCAG 1.4.10), sem testar de fato se o layout quebra em zoom 400%.
            // Ja validamos manualmente que o banner se adapta bem em telas pequenas.
            "WCAG2AA.Principle1.Guideline1_4.1_4_10.C32,C31,C33,C38,SCR34,G206",
        ],
    },

    urls: [
        "http://localhost:8081/",
        "http://localhost:8081/pages/about.html",
        "http://localhost:8081/pages/fleet.html",
        "http://localhost:8081/pages/contact.html",
        "http://localhost:8081/pages/legal.html",
        "http://localhost:8081/pages/thank-you.html"
    ]
};