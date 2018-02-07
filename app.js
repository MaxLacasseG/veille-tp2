/*jshint esversion: 6 */ 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/assets/'));

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/membres', (req,res)=>{
    res.render('membres');
});

app.get('/formulaire', (req,res)=>{
    res.render('formulaire');
});

app.post('/formulaire', (req,res)=>{
    res.render('formulaire');
});

app.listen(8000, ()=>{
    console.log('Écoute sur port 8000');
});