var mongoose = require('mongoose');
var Album = require('../models/Album'); // Remplacez par le chemin vers votre modèle d'album

mongoose.connect('mongodb://localhost:27017/phototheque', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  Album.collection.createIndex({ "title": 1 }, function(err, res) {
    if (err) throw err;
    console.log("Index created on title");
    mongoose.connection.close();
  });
});