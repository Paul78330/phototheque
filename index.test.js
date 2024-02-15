// Importation du module supertest pour tester les requêtes HTTP
const request = require('supertest');
// Importation du module sinon pour créer des espions et des bouchons
const sinon = require('sinon');
// Importation du modèle Album pour tester les interactions avec la base de données
const Album = require('./models/Album');
// Importation de l'application Express à tester
const app = require('./index');

let server;

// Avant chaque test, nous démarrons le serveur sur le port 3000
beforeEach(() => {
  server = app.listen(3000);
});

// Après chaque test, nous fermons le serveur pour libérer le port
afterEach(() => {
  server.close();
});

// Nous définissons un groupe de tests pour la route GET '/'
describe('GET /', () => {
  // Ce test vérifie que la route '/' redirige vers '/albums'
  it('should redirect to /albums', async () => {
    const res = await request(app)
      .get('/')
      .expect(302);
    expect(res.headers.location).toBe('/albums');
  });
});

// Nous définissons un groupe de tests pour la route POST '/album/create'
describe('POST /album/create', () => {
  // Ce test vérifie que la route '/album/create' crée un nouvel album
  it('should create a new album', async () => {
    const albumData = { albumTitle: 'Test Album' };
    // Nous créons un bouchon pour la méthode 'create' de l'Album
    const createStub = sinon.stub(Album, 'create').resolves();
    const res = await request(app)
      .post('/album/create')
      .send(albumData)
      .expect(302);
    // Nous vérifions que la méthode 'create' a été appelée avec les bonnes données
    sinon.assert.calledWith(createStub, { title: albumData.albumTitle });
    // Nous vérifions que la réponse redirige vers '/albums'
    expect(res.headers.location).toBe('/albums');
    // Nous restaurons la méthode 'create' à son comportement original
    createStub.restore();
  });
});

// Nous définissons un groupe de tests pour la route GET '/album/:id'
describe('GET /album/:id', () => {
  // Ce test vérifie que la route '/album/:id' renvoie le bon statut HTTP
  it('should render the album page', async () => {
    const idAlbum = '65ce545c9fb0faceda542e88'; // Utilisez l'ID spécifique ici
    const res = await request(app)
      .get(`/album/${idAlbum}`)
      .expect(200); // Nous nous attendons à un statut 200 si l'album existe
  });
});
