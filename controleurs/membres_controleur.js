var mongoose = require('mongoose')
var Membre = require('../modeles/membres_modele');

module.exports.controller = function (app) {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/membres', (req, res) => {
        Membre.find((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.render('membres', {
                    data: data
                });
            };
        });
    });

    app.get('/formulaire', (req, res) => {
        res.render('formulaire');
    });

    app.get('/traiter_form', (req, res) => {
        let nouveauMembre = new Membre({
            prenom: req.query.prenom,
            nom: req.query.nom,
            tel: req.query.tel,
            courriel: req.query.courriel
        });

        nouveauMembre.save((err, enreg) => {
            if (err) {
                res.status(500).send(err);
            } else {
                Membre.find((err, data) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.render('membres', {
                            data: data
                        });
                    };
                });
            };
        });
    });

    app.post('/formulaire', (req, res) => {
        res.render('formulaire');
    });
}