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

//====================================================
// ROUTES
//==============================================

//=== ACCUEIL
app.get('/', (req, res) => {
    db.collection('adresse').find().toArray(function (err, resultat) {
        if (err) return console.log(err);
        res.render('membres', {
            data: resultat
        });
    });
});


//===================== MODIFIER PAR POST
app.post('/modifier', (req, res) => {
    let adresse = {
        _id : ObjectID(req.body.id),
        prenom: req.body.prenom,
        nom: req.body.nom,
        tel: req.body.tel,
        courriel: req.body.courriel
    };

    db.collection('adresse').save(adresse, (err, enreg) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/');
        }
    });
});

// ============ AJOUTER
app.get('/ajouter', (req, res) => {
    db.collection('adresse').insert({}, (err, enreg) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/');
        }
    });
});

//============ 
app.get('/majMembre/:idMembre/:prenom/:nom/:tel/:courriel', (req, res) => {
    let membre = {
        _id: ObjectID(req.params._idMembre),
        nom: req.params.nom,
        prenom: req.params.prenom,
        tel: req.params.tel,
        courriel: req.params.courriel,
    };
    db.collection('adresse').save(membre, (err, resultat) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/');
        }
    })
});

//============================
//Detruire
//=========================
app.get('/detruireMembre/:id', (req, res) => {
    let id = ObjectID(req.params.id);
    db.collection('adresse').findOneAndDelete({_id: id}, (err, resultat) => {
        res.redirect('/');
    });
});


//======================
//Trier
//======================
app.get('/trier/:cle/:ordre', (req, res) => {
    let ordre = req.params.ordre == "asc" ? 1 : -1;
    let cle = req.params.cle;
    db.collection('adresse').find().sort(cle, ordre).toArray((err, resultat) => {
        ordre = !ordre;
        let direction = ordre == 1 ? "asc" : "desc";
        res.render("membres", {
            data: resultat,
            ordre: direction
        })
    });
});

//=============
//Page 404
0
app.use((req, res) => {
    res.status(404).render('404');
});

BDD.connect('mongodb://127.0.0.1:27017', (err, database) => {
    if (err) return console.log(err)
    db = database.db('carnet_adresse')
    // lancement du serveur Express sur le port 8081
    app.listen(8081, () => {
        console.log('connexion à la BD et on écoute sur le port 8081');
    });
});