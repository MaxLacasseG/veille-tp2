/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

//Connection à la bdd
//const bdd = require('mongoose');
//bdd.connect('mongodb://admin:veille1234@ds231228.mlab.com:31228/veille-node5');
const BDD = require('mongodb').MongoClient;
let db;
let Membre = require('./modeles/membres_modele');
//Assignation du moteur de rendu et middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/assets/'));

app.get('/', (req, res) => {
    var cursor = db.collection('adresse').find().toArray(function (err, resultat) {
        if (err) return console.log(err);
        res.render('membres', {
            data: resultat
        });
    });
});

app.get('/formulaire', (req, res) => {
    res.render('formulaire');
});

app.post('/ajouterMembre', (req, res) => {
    let nouveauMembre = new Membre({
        prenom: req.body.prenom,
        nom: req.body.nom,
        tel: req.body.tel,
        courriel: req.body.courriel
    });

    db.collection('adresse').save(nouveauMembre, (err, enreg) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/');
        }
    });
});

app.post('/majMembre', (req, res) => {
  
});

app.post('/detruireMembre', (req, res) => {
  
});

app.use((req, res) => {
    res.status(404).render('404');
});

BDD.connect('mongodb://127.0.0.1:27017', (err, database) => {
    if (err) return console.log(err)
    db = database.db('carnet_adresse')
    // lancement du serveur Express sur le port 8081
    app.listen(8081, () => {
        console.log('connexion à la BD et on écoute sur le port 8081')
    })
})