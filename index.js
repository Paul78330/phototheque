const express = require("express");
const session = require("express-session");
//pour telecharger nos images
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

//3
const flash = require("connect-flash");

//récupération des routes exportées depuis "../roues/album_routes"
const albumRoutes = require("./routes/albums_routes");

//3 - connexion à notre bdd pour la création de notre collection "album"
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/phototheque";
let retryCount = 0;
const maxRetryCount = 10;

const connectWithRetry = () => {
  console.log('Tentative de connexion à MongoDB')
  mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('MongoDB est connecté')
    console.log(DATABASE_URL);
  }).catch(err=>{
    console.log('La connexion à MongoDB a échoué, nouvelle tentative dans 10 secondes.')
    console.log(DATABASE_URL);
    if (retryCount < maxRetryCount) {
      setTimeout(() => {
        retryCount++;
        connectWithRetry();
      }, 10 * 1000);
    } else {
      console.log('La connexion à MongoDB a échoué après 10 tentatives, arrêt des tentatives de reconnexion.')
    }
  })
}

connectWithRetry();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//3 - gestion erreurs (connect-flash)
app.use(flash());

//5 - Activer fileUpload
app.use(fileUpload());

//2 - utilisation de nos routes
app.use("/", albumRoutes);
/**
 * tout ce qui sera ajoué aprsès '/' prendra en compte nos routes
 * parametré dans album_routes.js
 */

app.get("/", (req, res) => {
  // res.send('ok');
  // res.render('albums', {title: 'album'});

  //4 - si view(albums.js) + controller (const albums) édité
  res.redirect("/albums");
});

app.use((req, res) => {
  res.status(404);
  res.send("Page non trouvée");
});


let server;

function startServer() {
  server = app.listen(3000, () => {
    console.log('Application lancée sur le port 3000');
  });
  return server;
}

function stopServer(callback) {
  if (server) {
    server.close(callback);
  }
}

// Si index.js est exécuté directement, nous démarrons le serveur
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, stopServer, connectWithRetry };