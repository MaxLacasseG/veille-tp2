/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/assets/'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/membres', (req, res) => {
    fs.readFile('data/membres.json','utf8', (err,data)=> {
        if (err) throw err;
       res.render('membres', {data:data});
    });

    res.render('membres');
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

    fs.readFile('data/membres.json','utf8', (err,data)=> {
        if (err) throw err;
        let liste = JSON.parse(data);
        liste.push(reponse);

        fs.writeFile('data/membres.json', JSON.stringify(liste), (err)=>{
            if(err)throw err;
        });
    });

    res.render('membres');
});

app.post('/formulaire', (req, res) => {
    res.render('formulaire');
});

app.listen(8000, () => {
    console.log('Écoute sur port 8000');
});