/*jshint esversion: 6 */
"use stric";

let tds = document.querySelectorAll("td");

for(td of tds){
    td.addEventListener("focus", (evt)=>{
        console.log(evt.target);
    })
    td.addEventListener("dblclick", (evt)=>{
        this.target.removeEventListener('dblclick');
        evt.target.style.border = "1px solid black";
        evt.target.contenteditable = true;
       let elem = this.target;
       document.addEventListener("click", (elem)=>{
            console.log(blur);
            elem.contenteditable = false;
            elem.style.border = "none";
            document.removeEventListener("click");
        });
    });
};
