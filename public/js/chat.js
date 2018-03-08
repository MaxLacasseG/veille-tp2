"use strict";
var Client = {}

const connexionChat= ()=>{
    let btnConnexionChat = document.querySelector(".btnConnexionConteneur button");
    btnConnexionChat.parentNode.style.display = "none";
    //CONNEXION
    Client = io.connect();
    Client.on('connect', () => {
        connecterUtil(Client.id);
    });

    // =================================
    //      Écouteurs d'événements
    // ==================================
    
    //RÉCEPTION D'UN NOUVEL UTILISATEUR
    Client.on('nouvelUtilisateur', (data) => {
        afficherNom(data.nom, data.id)
    });

    //RÉCEPTION D'UN NOUVEAU MESSAGE
    Client.on('recevoirMessage', (data) => {
        recevoirMsg(data)
    });
};


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
    console.log("ok")
    let message = document.querySelector(".chatBoiteMsg").value;
    let msgGabarit = document.querySelector('.chatBoiteRep .chatRep.auteur');
    let msgClone = msgGabarit.cloneNode(true);

    msgClone.classList.remove("gabarit");
    msgClone.querySelector('.msg').innerText = message;
    msgClone.querySelector('.auteur').innerText = Client.nom;
    msgGabarit.parentNode.appendChild(msgClone);

    Client.emit('nouveauMessage', {
        nom: Client.nom,
        message: message
    });
}

const recevoirMsg = (data)=>{
    let msgGabarit = document.querySelector('.chatBoiteRep .chatRep.ami');
    let msgClone = msgGabarit.cloneNode(true);

    msgClone.classList.remove("gabarit");
    msgClone.querySelector('.msg').innerText = data.message;
    msgClone.querySelector('.ami').innerText = data.nom;
    msgGabarit.parentNode.appendChild(msgClone);
}