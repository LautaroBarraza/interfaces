"use strict"

document.addEventListener("DOMContentLoaded", cargar);

function cargar(){

    let header = document.querySelector("header");
    window.addEventListener("scroll", function(){
        let hero_tamanio = this.document.querySelector(".hero").clientHeight;
        if(this.window.scrollY>= hero_tamanio){
            header.classList.remove("header-hero");
        }else{
            header.classList.add("header-hero");
        }
    })
    

}