/*jshint esversion: 6 */
"use strict"

window.addEventListener('load', () => {
    //On récupère le tableau et les collections de boutons
    let tableau = document.querySelector(".tableauMembre");
    let ligneGabarit = tableau.querySelector("tr.gabarit");
    let tabBtnMod = tableau.querySelectorAll("td.btn-mod");
    let tabBtnDetr = tableau.querySelectorAll("td.btn-detr");
    let btnAjouter = tableau.querySelector(".btn-ajouter");

    //FONCTIONS AJOUTER MEMBRE VIA AJAX
    //==================================
    function gererAjout(evt) {
        evt.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "/ajouter-ajax", true);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();
        xhr.addEventListener("readystatechange", (evt) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let ligneVide = ligneGabarit.cloneNode(true);
                ligneVide.querySelector('input[type="hidden"]').value = JSON.parse(xhr.responseText)['0'];
                ligneVide.querySelector('.btn-mod').addEventListener('click', gererMod, false);
                ligneVide.querySelector('.btn-detr').addEventListener('click', gererDetr, false);
                ligneVide.classList.remove('gabarit');
                tableau.querySelector('tbody').appendChild(ligneVide);
            }
        }, false);
    }
    btnAjouter.addEventListener('click', gererAjout, false);

    //FONCTIONS DÉTRUIRE MEMBRE VIA AJAX
    //==================================
    
    //Collection des boutons détruire
    for (let btn of tabBtnDetr) {
        btn.addEventListener('click', gererDetr, false);
    }

    function gererDetr(evt) {
        evt.preventDefault();
        let id = this.parentNode.querySelector('input[type="hidden"]').value;
        let data = {
            id: id
        }
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "/detruire-ajax", true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.parametre = this;
        xhr.addEventListener("readystatechange", (evt) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                xhr.parametre.parentNode.parentNode.removeChild(xhr.parametre.parentNode);
            }
        }, false);
    }

    //FONCTIONS DÉTRUIRE MEMBRE VIA AJAX
    //==================================
    for (let btn of tabBtnMod) {
        btn.addEventListener('click', gererMod, false);
    }

    function gererMod(evt) {
        evt.preventDefault();
        let btn = this;
        let id = btn.parentNode.querySelector('input[type="hidden"]').value;
        let prenom = btn.parentNode.querySelector('td.prenom').innerText;
        let nom = btn.parentNode.querySelector('td.nom').innerText;
        let tel = btn.parentNode.querySelector('td.tel').innerText;
        let courriel = btn.parentNode.querySelector('td.courriel').innerText;

        let data = {
            id: id,
            prenom: prenom,
            nom: nom,
            tel: tel,
            courriel: courriel
        };

        let xhr = new XMLHttpRequest();
        xhr.open('POST', "/modifier-ajax", true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener("readystatechange", (evt) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }, false);
    }
}, false); //fin load