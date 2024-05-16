const mongoose = require('mongoose');

const partieSchema = new mongoose.Schema({
    // Define your schema fields here
    nom: {
        type: String,
     
    },
    joueur_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'joueur'
    },
    joueur_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'joueur'    },
    etat: {
        type: String,
        default: "en cours"
    },
});

const Partie = mongoose.model('Partie', partieSchema);

module.exports = Partie;