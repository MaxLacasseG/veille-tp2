/*jshint esversion: 6 */
"use stric";

let btnMods = document.querySelectorAll(".btn-mod");

for(let btn of btnMods){
    btn.addEventListener('click', (evt)=>{
        evt.preventDefault();
        let parent = btn.parentNode;
        let idTxt = parent.querySelector('.id').value;
        let prenomTxt = parent.querySelector('.prenom').innerText;
        let nomTxt= parent.querySelector('.nom').innerText;
        let telTxt= parent.querySelector('.tel').innerText;
        let courrielTxt= parent.querySelector('.courriel').innerText;
        
        let form = document.querySelector('form.formulairePost');
        let idInput = document.querySelector('#formId');
        let prenomInput = document.querySelector('#formPrenom');
        let nomInput = document.querySelector('#formNom');
        let telInput = document.querySelector('#formTel');
        let courrielInput = document.querySelector('#formCourriel');

        idInput.value = idTxt;
        prenomInput.value = prenomTxt;
        nomInput.value = nomTxt;
        telInput.value = telTxt;
        courrielInput.value = courrielTxt;

        form.submit();
        form.clear();
    }, false);
}