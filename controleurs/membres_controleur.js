var mongoose = require('mongoose')
var membre = require('../modeles/membres_modele');

module.exports.controller = function (app) {
    app.get('/', (req, res) => {
        res.render('index');
    });
    
    app.get('/membres', (req, res) => {
        fs.readFile('data/membres.json', 'utf8', (err, data) => {
            if (err) throw err;
            res.render('membres', {
                data: JSON.parse(data)
            });
        });
    });

    app.get('/formulaire', (req, res) => {
        res.render('formulaire');
    });

    app.get('/traiter_form', (req, res) => {
        let reponse = {
            prenom: req.query.prenom,
            nom: req.query.nom,
            tel: req.query.tel,
            courriel: req.query.courriel
        };

        fs.readFile('data/membres.json', 'utf8', (err, data) => {
            if (err) throw err;
            let liste = JSON.parse(data);
            liste.push(reponse);

            fs.writeFile('data/membres.json', JSON.stringify(liste), (err) => {
                if (err) throw err;
                res.render('membres', {
                    data: liste
                });
            });

        });
    });

    app.post('/formulaire', (req, res) => {
        res.render('formulaire');
    });

}