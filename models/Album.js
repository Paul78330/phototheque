const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title : {type: String, required: true},
    images : [String], //le chemin de notre image
}, 
{ timestamps: true});

// Ajout de l'indexation sur le champ 'title'
albumSchema.index({ title: 1 });


module.exports = mongoose.model('Album', albumSchema);