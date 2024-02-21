describe('Test E2E de l\'application Album', () => {
  const serverUrl = Cypress.env('CYPRESS_SERVER_URL') || 'http://localhost:3000';

  before(() => {
    cy.request(serverUrl).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it('Visite la page des albums et vérifie les liens', () => {
    cy.visit(`${serverUrl}/albums`);
    cy.get('a[href="/album/create"]').should('exist');
    cy.get('a[href^="/album/"]').should('exist');
    cy.get('a[href$="/delete"]').should('exist');
  });

  it('Crée un nouvel album et vérifie qu\'il est affiché', () => {
    const albumTitle = `Mon nouvel album ${Date.now()}`;
    cy.visit(`${serverUrl}/album/create`);
    cy.get('input[name="albumTitle"]').type(albumTitle);
    cy.get('button[type="submit"]').click();
    cy.visit(`${serverUrl}/albums`);
    cy.get('a').contains(albumTitle).should('exist');
  });

  it('Crée un autre nouvel album et vérifie qu\'il est affiché', () => {
    const albumTitle = `Mon autre nouvel album ${Date.now()}`;
    cy.visit(`${serverUrl}/album/create`);
    cy.get('input[name="albumTitle"]').type(albumTitle);
    cy.get('button[type="submit"]').click();
    cy.visit(`${serverUrl}/albums`);
    cy.get('a').contains(albumTitle).should('exist');
  });
});