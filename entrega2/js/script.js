'use strict'
document.addEventListener("DOMContentLoaded", function (){

    //Preloader//
    let numero = document.querySelector('#porcentaje');
    let contador = 0;
    let loader = document.querySelector('#onload');
    setInterval(()=>{
        if(contador==100){
            clearInterval();
            loader.remove(loader);
            document.querySelector('.hidden').style.overflow = "visible";
            document.querySelector('.hidden').style.animation = "fadeOut 1.3s";
        }else{
            contador+=1;
            numero.textContent = contador + "%";
        }
    }, 20);
    
    //desplegables//
    let main = document.querySelector(".nav");
    let user = document.querySelector(".user-nav");

    document.querySelector('.icon-main').addEventListener('click', () =>{
        if(user.classList.contains('showUser')){
            user.classList.remove('showUser');
        }
        main.classList.toggle("show");
        document.querySelector(".dark-background").classList.add("on");
        comprobar();
    });

    document.querySelector('.icon-user').addEventListener('click', () =>{
        if(main.classList.contains('show')){
            main.classList.remove('show');
        }
        user.classList.toggle("showUser");
        document.querySelector(".dark-background").classList.add("on");
        comprobar();
    });

    function comprobar(){
        if(!main.classList.contains('show') && !user.classList.contains('showUser')){
            document.querySelector(".dark-background").classList.remove("on");
        }
    }
});
