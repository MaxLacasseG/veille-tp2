/*jshint esversion: 6 */
"use stric";
/** 
 * Script servant à gérer la recherche d'un membre
 */


let input = document.querySelector('.formulaireRechercher input[type="submit"]');
/**
 * Fonction lancée lors du click du formulaire
 * On empêche de lancer la requête par défaut
 */
input.addEventListener('click', (evt) => {
    evt.preventDefault();
        
    let objet = {
        recherche:document.querySelector("#rechercheReq").value,
        cat : document.querySelector("#rechercheChoix").value
    };

    //On lance une requête AJAX pour récupérer les membres
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/rechercherMembre");
    ajax.setRequestHeader("Content-type","application/json;charset=UTF-8");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
           afficherRecherche(ajax.responseText);
        }
    };
    ajax.send(JSON.stringify(objet));

});

const afficherRecherche = (tabResultats)=>{
    console.log(tabResultats);
}