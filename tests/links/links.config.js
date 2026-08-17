// Purpose    : Configuration for linkinator broken-link checks.
// Consumed by: npm run test:links (and later the CI pipeline, Card 6)
// Layer      : Testing / Quality assurance

module.exports = {
    path: "http://localhost:8081",
    recurse: true,
    silent: false
};