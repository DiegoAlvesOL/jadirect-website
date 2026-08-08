// Purpose    : Configuration for linkinator broken-link checks.
// Consumed by: npm run test:links (and later the CI pipeline, Card 6)
// Layer      : Testing / Quality assurance

module.exports = {
    path: "public",
    recurse: true,
    silent: false
};