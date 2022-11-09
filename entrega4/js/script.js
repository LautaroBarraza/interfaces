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
    let icon_user =document.querySelector(".arrow-user")
    let background = document.querySelector(".dark-background");
    
    let line1 = document.querySelector(".line1-bars-menu");
    let line2 = document.querySelector(".line2-bars-menu");
    let line3 = document.querySelector(".line3-bars-menu");

    document.querySelector('.icon-main').addEventListener('click', () =>{
        line1.classList.toggle("activeline1__bars-menu");
        line2.classList.toggle("activeline2__bars-menu");
        line3.classList.toggle("activeline3__bars-menu");
        if(user.classList.contains('showUser')){
            user.classList.remove('showUser');
            icon_user.classList.toggle("drop-down");
            
        }
        main.classList.toggle("show");
        background.classList.add("on");
        check();
    });

    document.querySelector('.icon-user').addEventListener('click', () =>{
        if(main.classList.contains('show')){
            main.classList.remove('show');   
            line1.classList.toggle("activeline1__bars-menu");
            line2.classList.toggle("activeline2__bars-menu");
            line3.classList.toggle("activeline3__bars-menu");     
        }
        user.classList.toggle("showUser");
        icon_user.classList.toggle("drop-down");
        
        background.classList.add("on");        
        check();
    });

    function check(){
        if(!main.classList.contains('show') && !user.classList.contains('showUser')){         
            background.classList.remove("on");
        }
    }

    background.onclick = function(){
        user.classList.remove('showUser');
        main.classList.remove('show'); 
        background.classList.remove("on");
        line1.classList.remove("activeline1__bars-menu");
        line2.classList.remove("activeline2__bars-menu");
        line3.classList.remove("activeline3__bars-menu");   
        icon_user.classList.remove("drop-down");
    }
    //Ventana modal
    let modal = document.querySelector('#modal');
    document.querySelector('#openModal').addEventListener('click', ()=>{
        modal.classList.add('modal-flex');
    });
    document.querySelector('#closeModal').addEventListener('click', ()=>{
        modal.classList.remove('modal-flex');
    });
    modal.onclick = function(){
        modal.classList.remove('modal-flex');
    }   
});
