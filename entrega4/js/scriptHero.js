"use strict"

document.addEventListener("DOMContentLoaded", load);

function load(){

    //seccion hero//

    let prof1= document.querySelector(".prof1");
    let prof2= document.querySelector(".prof2");
    let prof3= document.querySelector(".prof3");

    window.addEventListener("scroll", moveHero);

    function moveHero(){
        let value= window.scrollY;
        prof1.style.top= value*0.5+"px";
        prof2.style.bottom=-1+"px";
        prof3.style.top=value+50*0.8+"px";
        console.log(value)
    }

    /*header hero*/
    let header = document.querySelector("header");
    let hero_tamanio = document.querySelector(".hero").clientHeight;
    window.addEventListener("scroll", function(){
        if(this.window.scrollY>= hero_tamanio){
            header.classList.remove("header-hero");
        }else{
            header.classList.add("header-hero");
        }
    })

    /* flecha hero*/
    document.querySelector(".arrow-hero").addEventListener("click", () => {
        window.scroll({
            top: hero_tamanio,
            left: 0,
            behavior: 'smooth'
          });
    })
    

}