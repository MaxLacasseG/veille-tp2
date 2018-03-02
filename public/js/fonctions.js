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
    btnAjouter.addEventListener('click', (evt) => {
        evt.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "/ajouter-ajax", true);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();
        xhr.addEventListener("readystatechange", (evt) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let ligneVide = ligneGabarit.cloneNode(true);
                ligneVide.querySelector('input[type="hidden"]').value = JSON.parse(xhr.responseText)['0'];
                ligneVide.classList.remove('gabarit');
                tableau.querySelector('tbody').appendChild(ligneVide);
            }
        }, false);

    }, false);
    //FONCTIONS DÉTRUIRE MEMBRE VIA AJAX
    //==================================
    for (let btn of tabBtnDetr) {
        btn.addEventListener('click', (evt) => {
            evt.preventDefault();
            let id = btn.parentNode.querySelector('input[type="hidden"]').value;
            console.log(id);
            let data = {
                _id : id
            }
            let xhr = new XMLHttpRequest();
            xhr.open('POST', "/detruire-ajax", true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.addEventListener("readystatechange", (evt) => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                   console.log(xhr.responseText);
                }
            }, false);
        }, false);
    }
}, false);//fin load