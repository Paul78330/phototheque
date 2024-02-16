describe('Test E2E de l\'application Album', () => {
  it('Visite la page des albums et vérifie les liens', () => {
    // Visite la page des albums
    cy.visit('http://localhost:3000/albums')

    // Vérifie que le lien "Nouvel album" fonctionne
    cy.get('a[href="/album/create"]').should('exist')

    // Vérifie que les liens des albums existent
    cy.get('a[href^="/album/"]').should('exist')

    // Vérifie que les liens de suppression des albums existent
    cy.get('a[href$="/delete"]').should('exist')
  })

  it('Crée un nouvel album et vérifie qu\'il est affiché', () => {
    // Visite la page de création d'un nouvel album
    cy.visit('http://localhost:3000/album/create')

    // Remplit le formulaire avec le titre de l'album
    cy.get('input[name="albumTitle"]').type('Mon nouvel album')

    // Soumet le formulaire
    cy.get('button[type="submit"]').click()

    // Vérifie que l'album a bien été créé en vérifiant qu'il est affiché sur la page des albums
    cy.visit('http://localhost:3000/albums')
    cy.get('a').contains('Mon nouvel album').should('exist')
  })
})