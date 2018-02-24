let creerListe = ()=> {
    const tab = require('./tableau.js');
    let liste = [];
    for (i = 0; i < 20; i++) {
        let personne = {};
        personne.prenom = tab.tabPrenom[Math.floor(Math.random() * tab.tabPrenom.length)];
        personne.nom = tab.tabNom[Math.floor(Math.random() * tab.tabNom.length)];

        let no = "";
        for (j = 0; j < 8; j++) {
            if(j==3){
                no += "-";
            }else{
                no += Math.floor(Math.random() * 9).toString();
            }
        }
        personne.tel = tab.tabIndicatif[Math.floor(Math.random() * tab.tabIndicatif.length)] + " "+ no;

        personne.courriel = personne.prenom.slice(0, 1).toLowerCase() + personne.nom.toLowerCase() + "@" + tab.tabDomaine[Math.floor(Math.random() * tab.tabDomaine.length)];

        liste.push(personne);
    }
    return liste;
}
module.exports = creerListe;