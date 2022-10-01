'use strict'
document.addEventListener("DOMContentLoaded", function (){

    //Preloader//
    let number = document.querySelector('#percentage');
    let counter = 0;
    let loader = document.querySelector('#onload');
    setInterval(()=>{
        if(counter==100){
            clearInterval();
            loader.remove(loader);
            document.querySelector('.hidden').style.overflow = "visible";
            document.querySelector('.hidden').style.animation = "fadeOut 1.3s";
        }else{
            counter+=1;
            number.textContent = counter + "%";
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
        check();
    });

    document.querySelector('.icon-user').addEventListener('click', () =>{
        if(main.classList.contains('show')){
            main.classList.remove('show');
        }
        user.classList.toggle("showUser");
        document.querySelector(".dark-background").classList.add("on");
        comprobar();
    });

    function check(){
        if(!main.classList.contains('show') && !user.classList.contains('showUser')){
            document.querySelector(".dark-background").classList.remove("on");
        }
    }
});
