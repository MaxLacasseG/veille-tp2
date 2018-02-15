/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

//Connection à la bdd
const BDD = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let db;
//Assignation du moteur de rendu et middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/assets/'));

app.get('/', (req, res) => {
    var cursor = db.collection('membre').find().toArray(function (err, resultat) {
        if (err) return console.log(err);
        res.render('membres', {
            data: resultat
        });
    });
});

app.get('/formulaire', (req, res) => {
    res.render('formulaire');
});

// app.post('/ajouterMembre', (req, res) => {
//     let nouveauMembre = new Membre({
//         prenom: req.body.prenom,
//         nom: req.body.nom,
//         tel: req.body.tel,
//         courriel: req.body.courriel
//     });

//     db.collection('adresse').save(nouveauMembre, (err, enreg) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.redirect('/');
//         }
//     });
// });

app.get('/ajouter', (req, res) => {
    db.collection('membre').insert({}, (err, enreg) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/majMembre/:idMembre/:prenom/:nom/:tel/:courriel', (req, res) => {
    let membre = {
        "_id": ObjectID(req.params._idMembre),
        nom: req.params.nom,
        prenom: req.params.prenom,
        tel: req.params.tel,
        courriel: req.params.courriel,
    };
    db.collection('membre').save(membre, (err, resultat) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/');
        }
    })
});

app.get('/detruireMembre/:idMembre', (req, res) => {
    var id = req.params.idMembre;
    console.log(id);
    db.collection('membre').findOneAndDelete({
        "_id": ObjectID(req.params.idMembre)
    }, (err, resultat) => {
        if (err) return console.log(err);
        res.redirect('/');
    });
});

app.use((req, res) => {
    res.status(404).render('404');
});

BDD.connect('mongodb://127.0.0.1:27017', (err, database) => {
    if (err) return console.log(err)
    db = database.db('membres')
    // lancement du serveur Express sur le port 8081
    app.listen(8081, () => {
        console.log('connexion à la BD et on écoute sur le port 8081');
    });
});