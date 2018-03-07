"use strict";
var Client = {}
window.addEventListener('load', (e) => {
    console.log('ok');
    let btnConnexionChat = document.querySelector(".btnConnexionConteneur button");
    //Objet client enregistré en global

    //AU CLIC, CONNEXION
    btnConnexionChat.addEventListener('click', (evt) => {
        btnConnexionChat.parentNode.style.display = "none";

        //CONNEXION
        Client = io.connect();
        Client.on('connect', () => {
            connecterUtil(Client.id);
        });


        //RÉCEPTION D'UN NOUVEL UTILISATEUR
        Client.on('nouvelUtilisateur', (data) => {
            afficherNom(data.nom, data.id)
        });

        //RÉCEPTION D'UN NOUVEL UTILISATEUR
        Client.on('recevoirMessage', (data) => {
            afficherNom(data.nom, data.id)
        });
    }, false);
}, false);

const connecterUtil = () => {
    Client.nom = document.querySelector('input.nomChat').value;
    Client.emit('enregistrement', {
        nom: Client.nom
    });
}

const afficherNom = (nom, id) => {
    let liste = document.querySelector('.listeChat');
    let cloneListeNom = document.querySelector('.listeChat .membreChat.gabarit');
    let nouvelUtil = cloneListeNom.cloneNode(true);
    nouvelUtil.innerText = nom;
    nouvelUtil.dataset.id = id;
    nouvelUtil.classList.remove('gabarit');
    liste.appendChild(nouvelUtil);
}
const envoyerMsg = () => {
    console.log("ok");
    let message = document.querySelector(".chatBoiteMsg").value;
    Client.on('envoyerMessage', {
        nom: Client.nom,
        message: message
    });
}