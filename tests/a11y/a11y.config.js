// Purpose    : Configuration for pa11y-ci accessibility audits.
// Consumed by: npm run test:a11y (and later the CI pipeline, Card 6)
// Layer      : Testing / Quality assurance


module.exports = {
    defaults: {
        timeout: 30000,
        wait: 1000,
        runners: ["axe", "htmlcs"],
        includeWarnings: true,
    },

    urls: [
        "http://localhost:8081/",
        "http://localhost:8081/pages/about.html",
        "http://localhost:8081/pages/fleet.html",
        "http://localhost:8081/pages/contact.html",
        "http://localhost:8081/pages/legal.html"
    ]
};