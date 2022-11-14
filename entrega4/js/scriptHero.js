"use strict"

document.addEventListener("DOMContentLoaded", load);

function load(){



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

            //seccion hero parallax//
    let prof1= document.querySelector(".prof1");
    let prof2= document.querySelector(".prof2");
    let prof3= document.querySelector(".prof3");
    window.addEventListener("scroll", moveHero);

    function moveHero(){
        let value= window.scrollY;
        let coeficiente = (100 / hero_tamanio)/100;
        prof1.style.top= value*0.5+"px";
        prof2.style.bottom=-1+"px";
        prof3.style.top=value+50*0.8+"px";
        prof3.style.opacity = 1-value * coeficiente
        console.log(value);
    }

    /* flecha hero*/
    document.querySelector(".arrow-hero").addEventListener("click", () => {
        window.scroll({
            top: hero_tamanio,
            left: 0,
            behavior: 'smooth'
          });
    })
    

}