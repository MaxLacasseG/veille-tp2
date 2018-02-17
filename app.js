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
app.use(express.static(__dirname + '/assets/'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

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
    db.collection('adresse').find().sort({cle: ordre}).toArray((err, resultat) => {
        ordre = !ordre;
        let direction = ordre == 1 ? "asc" : "desc";
        
        return res.render('membres', {data:resultat})
    });
});

//=============
//Page 404

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