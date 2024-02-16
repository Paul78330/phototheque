// Importation des modules nécessaires
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const Album = require('./models/Album');
const { app, startServer, stopServer } = require('./index');

let server;
// Avant tous les tests, nous démarrons le serveur
beforeAll(async () => {
  server = await startServer();
});

// Après tous les tests, nous fermons le serveur et la connexion à MongoDB
afterAll(async () => {
  await stopServer();
  await mongoose.connection.close();
});

// Après chaque test, nous restaurons tous les stubs et les spies
afterEach(() => {
  sinon.restore();
});

describe('GET /', () => {
  it('should redirect to /albums', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toBe('/albums');
  });
});

// Test de la route POST /album/create
describe('POST /album/create', () => {
  it('should create a new album', async () => {
    const albumData = { albumTitle: 'Test Album' };
    // Nous espionnons la méthode Album.create avec Sinon
    const createStub = sinon.stub(Album, 'create').resolves();
    return request(app) // Retour de la promesse
      .post('/album/create')
      .send(albumData)
      .expect(302)
      .then(res => { // Utilisation de then pour vérifier la redirection et l'appel à Album.create
        sinon.assert.calledWith(createStub, { title: albumData.albumTitle });
        expect(res.headers.location).toBe('/albums');
      });
  });
});



let idAlbum;

beforeEach(async () => {
  const album = new Album({ title: 'Test Album' });
  await album.save();
  idAlbum = album._id;
});
// Test de la route GET /album/:id
describe('GET /album/:id', () => {
  it('should render the album page', () => {
    return request(app)
      .get(`/album/${idAlbum}`)
      .expect(200);
  });
});