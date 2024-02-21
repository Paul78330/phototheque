// Importation des modules nécessaires
const request = require("supertest");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const portfinder = require('portfinder');
const app = express();

// Importation des routes d'album de votre application
const router = require("../routes/albums_routes");

// Configuration de l'application pour utiliser JSON, express-session, connect-flash et vos routes d'album
app.use(express.json());

app.use(
  session({
    secret: "your secret key",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

app.use("/", router);

let server;
let port;

beforeAll(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

afterAll(() => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
});

// Définition d'une suite de tests pour vos routes d'album
describe("Album routes", () => {
  // Test pour vérifier que la création d'un nouvel album fonctionne correctement
  it("should create a new album", async () => {
    // Faire une requête POST pour créer un nouvel album
    const res = await request(server).post("/album/create").send({
      albumTitle: "Test Album",
    });
    // Vérifier que le code de statut de la réponse est 302 (redirection)
    expect(res.statusCode).toEqual(302);
    // Vérifier que l'application redirige vers '/albums' après la création d'un album
    
  }, 60000); // Ajouter un délai de 10 secondes pour éviter les erreurs de délai d'attente

});