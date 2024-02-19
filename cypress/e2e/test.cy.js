// Définition de la suite de tests
describe('Test E2E de l\'application Album', () => {
  // Définition de l'URL du serveur comme variable pour faciliter les modifications futures
  const serverUrl = Cypress.env('CYPRESS_SERVER_URL') || 'http://localhost:8080';

  // Avant la suite de tests, vérifie que le serveur est en cours d'exécution
  // Utilisation de 'before' au lieu de 'beforeEach' car cette vérification n'a besoin d'être faite qu'une seule fois
  before(() => {
    cy.request(serverUrl);
  });

  // Test pour vérifier les liens sur la page des albums
  it('Visite la page des albums et vérifie les liens', () => {
    // Visite la page des albums
    cy.visit(`${serverUrl}/albums`);

    // Vérifie que le lien "Nouvel album" existe
    cy.get('a[href="/album/create"]').should('exist');

    // Vérifie que les liens des albums existent
    cy.get('a[href^="/album/"]').should('exist');

    // Vérifie que les liens de suppression des albums existent
    cy.get('a[href$="/delete"]').should('exist');
  });

  // Test pour créer un nouvel album et vérifier qu'il est affiché
  it('Crée un nouvel album et vérifie qu\'il est affiché', () => {
    // Génère un titre d'album unique pour chaque exécution de test
    const albumTitle = `Mon nouvel album ${Date.now()}`;

    // Visite la page de création d'un nouvel album
    cy.visit(`${serverUrl}/album/create`);

    // Remplit le formulaire avec le titre de l'album
    cy.get('input[name="albumTitle"]').type(albumTitle);

    // Soumet le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifie que l'album a bien été créé en vérifiant qu'il est affiché sur la page des albums
    cy.visit(`${serverUrl}/albums`);
    cy.get('a').contains(albumTitle).should('exist');
  });
});