"use strict";

window.addEventListener('load', (e)=>{
    console.log('ok');
    let btnConnexionChat = document.querySelector(".btnConnexionConteneur button");
    //Objet client enregistré en global
    var Client = {}

    //AU CLIC, CONNEXION
    btnConnexionChat.addEventListener('click', (evt)=>{
        btnConnexionChat.parentNode.style.display= "none";

        //CONNEXION
        Client = io.connect();
        Client.on('connect', ()=>{
            console.log(Client.id);
           
            let nomUtil = document.querySelector('input.nomChat').value;
            Client.emit('enregistrement',{nom:nomUtil});
        });

        //ENREGISTREMENT D'UN UTILISATEUR
        Client.on('nouvelUtilisateur', (data)=>{
            console.log(data.nom);
        });
    },false);
   
  

},false);