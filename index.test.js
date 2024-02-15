// Importation des modules né// Importation des modules nécessaires
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const Album = require('./models/Album');
const app = require('./index');

let server;

// Avant tous les tests, nous démarrons le serveur et nous connectons à la base de données
beforeAll((done) => {
  // Choix d'un port aléatoire pour le serveur
  const port = Math.floor(Math.random() * (60000 - 3000 + 1)) + 3000;
  // Démarrage du serveur
  server = app.listen(port, done);
  // Connexion à la base de données MongoDB
  mongoose.connect('mongodb://127.0.0.1:27017/phototheque', { useNewUrlParser: true, useUnifiedTopology: true });
});

// Après tous les tests, nous fermons le serveur et la connexion à la base de données
afterAll(() => {
  return new Promise((resolve, reject) => {
    server.close(() => {
      mongoose.connection.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}, 10000);

// Après chaque test, nous restaurons les fonctions espionnées par Sinon
afterEach(() => {
  sinon.restore();
});

// Test de la route GET /
describe('GET /', () => {
  it('should redirect to /albums', async () => {
    return request(app) // Retour de la promesse
      .get('/')
      .expect(302)
      .then(res => { // Utilisation de then pour vérifier la redirection
        expect(res.headers.location).toBe('/albums');
      });
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

// Test de la route GET /album/:id
describe('GET /album/:id', () => {
  it('should render the album page', async () => {
    const idAlbum = '65ce545c9fb0faceda542e88';
    return request(app) // Retour de la promesse
      .get(`/album/${idAlbum}`)
      .expect(200);
  });
});