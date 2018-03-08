"use strict";
var Client = {}

const connexionChat= ()=>{
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

    Client.on('recevoirListeNoms', (data)=>{
        recevoirListeNoms(data);
    })

    //RÉCEPTION D'UN NOUVEAU MESSAGE
    Client.on('recevoirMessage', (data) => {
        recevoirMsg(data)
    });

    //DÉCONNEXION D'UN AUTRE UTILISATEUR
    Client.on('enleverUtil', (data) => {
        enleverUtil(data);
    });
};


const connecterUtil = () => {
    Client.nom = document.querySelector('input.nomChat').value;
    
    document.querySelector(".btnConnexionConteneur").style.display = "none";
    let btnDeconnexion = document.querySelector(".btnDeconnexionConteneur").style.display = "block";
    document.getElementsByTagName('span')[0].innerText = Client.nom;

    Client.emit('enregistrement', {
        nom: Client.nom
    });

    Client.emit('demanderNoms');
}

const recevoirListeNoms = (liste)=>{
    console.log(liste);
    for(let membre of liste){
        console.log("membre", membre)
        afficherNom(membre.nom, membre.id);
    }
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
    document.querySelector(".chatBoiteMsg").value = "";
}

const recevoirMsg = (data)=>{
    let msgGabarit = document.querySelector('.chatBoiteRep .chatRep.ami');
    let msgClone = msgGabarit.cloneNode(true);

    msgClone.classList.remove("gabarit");
    msgClone.querySelector('.msg').innerText = data.message;
    msgClone.querySelector('.ami').innerText = data.nom;
    msgGabarit.parentNode.appendChild(msgClone);
}

const deconnexionChat = ()=>{
    Client.disconnect();

   let liste = document.querySelectorAll('ul.listeChat li:not(.gabarit)');
   viderListe(liste);
   let messages = document.querySelectorAll('.chatBoiteRep div:not(.gabarit)')
   viderListe(messages);

    let btnDeconnexion = document.querySelector(".btnDeconnexionConteneur").style.display = "none";
    document.getElementsByTagName('span')[0].innerText = "";
    document.querySelector('input.nomChat').value = "";
    document.querySelector(".btnConnexionConteneur").style.display = "block";

}

const enleverUtil = (data)=>{
    console.log('deconnect', data)
    let utilisateur = document.querySelector('ul.listeChat li[data-id="'+data+'"]');
    console.log(utilisateur);
    utilisateur.parentNode.removeChild(utilisateur);
}

const viderListe = (liste)=>{
    for(let elm of liste) {
        elm.parentNode.removeChild(elm);
    };
}