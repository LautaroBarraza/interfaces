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
        prof3.style.opacity = 1-value * (coeficiente*1.7)
        //console.log(value);
    }
    
    //Scroll cards hero
    let faders = document.querySelectorAll('.fade-in');
    let sliders = document.querySelectorAll('.slide-in');
    let slidersUp = document.querySelectorAll('.slide-up');

    let herotext1 = document.querySelector('#hero-text-1');
    let herotext2 = document.querySelector('#hero-text-2');
    let herotext3 = document.querySelector('#hero-text-3');

    let heroCard1 = document.querySelector('#hero-card-1');
    let heroCard2 = document.querySelector('#hero-card-2');
    let heroCard3 = document.querySelector('#hero-card-3');

    let galery = document.querySelector('#positionGalery');
    let heroImg3 = document.querySelector('#hero-img-3');
    let heroParagraph3 = document.querySelector('#hero-paragraph-3');
    let heroTitle3 = document.querySelector('#hero-title-3');
    let titles = document.querySelectorAll('.title');

    let characters=document.querySelector("article.characters ul.slide");
    let containerCharacters= document.querySelector("article.characters .container-characters")
    
    window.addEventListener('scroll', scrollAppear);  
  
    function scrollAppear(){      
        faders.forEach(fader =>{
            let top = fader.getBoundingClientRect().top;
            let bottom = fader.getBoundingClientRect().bottom;  
            let scroll = window.innerHeight;
            if(top >= 0 && bottom <= scroll){
                fader.classList.add('appear')
            }
        })

        sliders.forEach(slider =>{
            let top = slider.getBoundingClientRect().top;
            let bottom = slider.getBoundingClientRect().bottom;  
            let scroll = window.innerHeight;
            if(top >= 0 && bottom <= scroll){
                slider.classList.add('appear')
            }
        })    

        let position = window.innerHeight - window.innerHeight/2;
        let topPosition = herotext1.getBoundingClientRect().top;
        let topPosition1 = herotext2.getBoundingClientRect().top;
        let topPosition2 = herotext3.getBoundingClientRect().top;
        let topGalery = galery.getBoundingClientRect().top;
        
        if(topPosition < position){
            heroCard1.classList.add('showContent');
            herotext1.classList.remove('fade-in')
            if(heroCard2.classList.contains('showContent')){
                heroCard2.classList.remove('showContent');
                herotext2.classList.add('fade-in')
            }
        }

        if(topPosition1 < position){ 
            heroCard1.classList.remove('showContent');
            herotext1.classList.add('fade-in')
            heroCard2.classList.add('showContent');
            herotext2.classList.remove('fade-in')
            if(heroCard3.classList.contains('showContent')){
                heroCard3.classList.remove('showContent');
                herotext3.classList.add('fade-in')
            }
        }
        
        if(topPosition2 < position){
            heroCard2.classList.remove('showContent');
            herotext2.classList.add('fade-in')
            heroCard3.classList.add('showContent');
            herotext3.classList.remove('fade-in')
        }

        if(topGalery < position){
            heroImg3.classList.remove('appear');
            heroParagraph3.classList.remove('appear');
            heroTitle3.classList.remove('appear');
        }

        slidersUp.forEach(slider =>{
            let top = slider.getBoundingClientRect().top;
            let scroll = window.innerHeight;
            if(top < scroll){
                slider.classList.add('appear')
            }
        })
       
        titles.forEach(title =>{
            let bottom = title.getBoundingClientRect().bottom;  
            let scroll = window.innerHeight;
            let scrollY = window.scrollY;
            let elementHeight = title.clientHeight;
            let opacity = ((1 - (elementHeight - scrollY) / 5) * 0.008) + 0.04;
            let translate = (-160 + (scrollY * 0.08));
            let num = opacity.toFixed(1)
            title.style.opacity = `${num/3.6}`;
            title.style.transform = `translateY(${20 - translate}px)`;  
            if(bottom > scroll){     
                title.style.opacity = '0';
                title.style.transform = 'translateY(100px)';       
            }
        })

        let top=containerCharacters.getBoundingClientRect().top-window.innerHeight;
        if(top*1.4>-201){
            characters.style.transform=`translateY(${top*1.4}px)`;
        }
        
        
        console.log()
        console.log(window.innerHeight)


    }
}