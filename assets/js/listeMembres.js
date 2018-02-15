/*jshint esversion: 6 */
"use stric";

let btnMods = document.querySelectorAll(".btn-mod");

for(let btn of btnMods){
    btn.addEventListener('click', (evt)=>{
        evt.preventDefault();
        let parent = btn.parentNode;
        let id = parent.querySelector('.id').value;
        let prenom = parent.querySelector('.prenom').innerText;
        let nom= parent.querySelector('.nom').innerText;
        let tel= parent.querySelector('.tel').innerText;
        let courriel= parent.querySelector('.courriel').innerText;
        window.location.href = "/majMembre/"+id+"/"+prenom+"/"+nom+"/"+tel+"/"+courriel;
    }, false);
}