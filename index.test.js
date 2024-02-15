const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const Album = require('./models/Album');
const app = require('./index');

let server;

beforeEach((done) => {
  const port = Math.floor(Math.random() * (60000 - 3000 + 1)) + 3000;
  server = app.listen(port, done);
});

afterAll((done) => {
  server.close(() => {
    mongoose.connection.close(done);
  });
}, 10000);

afterEach(() => {
  sinon.restore();
});

describe('GET /', () => {
  it('should redirect to /albums', async () => {
    const res = await request(app)
      .get('/')
      .expect(302);
    expect(res.headers.location).toBe('/albums');
  });
});

describe('POST /album/create', () => {
  it('should create a new album', async () => {
    const albumData = { albumTitle: 'Test Album' };
    const createStub = sinon.stub(Album, 'create').resolves();
    const res = await request(app)
      .post('/album/create')
      .send(albumData)
      .expect(302);
    sinon.assert.calledWith(createStub, { title: albumData.albumTitle });
    expect(res.headers.location).toBe('/albums');
  });
});

describe('GET /album/:id', () => {
  it('should render the album page', async () => {
    const idAlbum = '65ce545c9fb0faceda542e88';
    const res = await request(app)
      .get(`/album/${idAlbum}`)
      .expect(302);
  });
});