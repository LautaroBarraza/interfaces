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
    
    //Scroll cards hero
    let faders = document.querySelectorAll('.fade-in');
    let sliders = document.querySelectorAll('.slide-in');

    let herotext1 = document.querySelector('#hero-text-1');
    let herotext2 = document.querySelector('#hero-text-2');
    let herotext3 = document.querySelector('#hero-text-3');

    let heroCard1 = document.querySelector('#hero-card-1');
    let heroCard2 = document.querySelector('#hero-card-2');
    let heroCard3 = document.querySelector('#hero-card-3');
    

    window.addEventListener('scroll', scrollAppear);  
  
    function scrollAppear(){      
        faders.forEach(fader =>{
            let intoPosition = fader.getBoundingClientRect().top;
            let screenPosition = window.innerHeight;
            if(intoPosition < screenPosition){   
                fader.classList.add('appear')    
            }
        })

        let position = window.innerHeight/2;
        let topPosition = herotext1.getBoundingClientRect().top;
        let topPosition1 = herotext2.getBoundingClientRect().top;
        let topPosition2 = herotext3.getBoundingClientRect().top;

        if(topPosition < position){
            heroCard1.classList.add('showContent');
            if(heroCard2.classList.contains('showContent')){
                heroCard2.classList.remove('showContent');
            }
        }

        if(topPosition1 < position){ 
            heroCard1.classList.remove('showContent');
            heroCard2.classList.add('showContent');
            if(heroCard3.classList.contains('showContent')){
                heroCard3.classList.remove('showContent');
            }
        }
        
        if(topPosition2 < position){
            heroCard2.classList.remove('showContent');
            heroCard3.classList.add('showContent');
        }

        sliders.forEach(slider =>{
            let intoPosition = slider.getBoundingClientRect().top;
            let screenPosition = window.innerHeight;
            if(intoPosition < screenPosition){
                slider.classList.add('appear')
            }
        })    
    }
}