// Importation des modules nécessaires
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const Album = require('./models/Album');
const { app, startServer, stopServer, connectWithRetry } = require('./index');

jest.setTimeout(120000); // Augmenter le délai d'attente de Jest à 120 secondes
jest.testEnvironment = 'node'; // Définir l'environnement de test sur 'node'

beforeAll(async () => {
  try {
    await connectWithRetry();
  } catch (error) {
    console.error('Failed to connect with retry, trying to connect without retry', error);
    try {
      await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      console.error('Failed to connect without retry', error);
      throw error; // Rethrow the error to fail the test
    }
  }
}, 120000);

// Après tous les tests, nous fermons le serveur et la connexion à MongoDB
afterAll(async () => {
  await stopServer();
  await mongoose.connection.close();
});

// Après chaque test, nous restaurons tous les stubs et les spies
afterEach(() => {
  sinon.restore();
});

// Déplacer la création de l'album dans un bloc beforeAll
let idAlbum;
beforeAll(async () => {
  const album = new Album({ title: 'Test Album' });
  await album.save();
  idAlbum = album._id;
});

// Les tests restent les mêmes

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
  }, 30000);
});


// Test de la route GET /album/:id
describe('GET /album/:id', () => {
  it('should render the album page', async () => {
    const res = await request(app)
      .get(`/album/${idAlbum}`)
      .expect(200);
    
    // Ajoute une assertion pour vérifier que le titre de l'album est présent dans le corps de la réponse
    expect(res.text).toContain('Test Album');
  },30000);
});