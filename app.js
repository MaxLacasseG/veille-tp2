/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');



//Connection à la bdd
const bdd = require('mongoose');
bdd.connect('mongodb://admin:veille1234@ds231228.mlab.com:31228/veille-node5');

//Assignation du moteur de rendu
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets/'));


let route = require('./controleurs/membres_controleur');
route.controller(app);

app.use(function(req, res) {
    res.status(404).render('404');
});

app.listen(8000, () => {
    console.log('Écoute sur port 8000');
});