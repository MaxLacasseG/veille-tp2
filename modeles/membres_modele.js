let bdd = require('mongoose');
let Schema = bdd.Schema;
let MembreModele = new Schema({
    prenom: String,
    nom: String,
    courriel: String,
    tel: String
});

Membre = bdd.model('Membre', MembreModele);
module.exports = Membre;