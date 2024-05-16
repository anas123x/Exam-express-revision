const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
    // Define your schema fields here
 pseudo: {
        type: String,
        required: true
    },
    score: {
        type: Number,
default: 0  , },
    sante: {
        type: Number,
        required: true,
        default: 100
    }
 
 
});

const Joueur = mongoose.model('joueur', joueurSchema);

module.exports = Joueur;