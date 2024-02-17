module.exports = {
  e2e: {
    // Cette fonction est utilisée pour configurer les écouteurs d'événements Node.js pour les tests de bout en bout.
    setupNodeEvents(on, config) {
      // Implémentez ici les écouteurs d'événements Node.js.
    },
    // specPattern définit le motif de recherche pour les fichiers de test de bout en bout.
    // Ici, il est configuré pour rechercher tous les fichiers .cy.js dans le répertoire cypress/e2e et ses sous-répertoires.
    specPattern: "cypress/e2e/**/*.cy.js",
  },
};
