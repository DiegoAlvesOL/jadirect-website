// Purpose    : Configuration for linkinator broken-link checks.
// Consumed by: npm run test:links (and later the CI pipeline, Card 6)
// Layer      : Testing / Quality assurance

module.exports = {
    path: "http://localhost:8081",
    recurse: true,
    silent: false,
    // O runner do GitHub Actions tem bem menos CPU/memoria que uma maquina local, e o
    // Nginx roda dentro do mesmo Docker Compose competindo por recursos. A concorrencia
    // padrao do linkinator (100 requisicoes simultaneas) causava timeout intermitente em
    // arquivos locais legitimos (ex: contact.css, legal.css), reportados como status 0.
    // Reduzir concorrencia e aumentar o timeout estabiliza isso sem mascarar link quebrado
    // de verdade, um link 404 real continua reportando 404, nao 0.
    concurrency: 5,
    timeout: 15000,
    retry: true,
    retryErrorsCount: 3
};