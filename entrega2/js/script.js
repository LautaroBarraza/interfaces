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
    let background = document.querySelector(".dark-background");
    let hamburger = document.querySelector('#hamburger');

    document.querySelector('.icon-main').addEventListener('click', () =>{
        if(user.classList.contains('showUser')){
            user.classList.remove('showUser');
        }
        main.classList.toggle("show");
        background.classList.add("on");
        hamburger.classList.add('fa-xmark', 'fa-2xl');    
        check();
    });

    document.querySelector('.icon-user').addEventListener('click', () =>{
        if(main.classList.contains('show')){
            main.classList.remove('show');
            hamburger.classList.remove('fa-xmark', 'fa-2xl');
        }
        user.classList.toggle("showUser");
        background.classList.add("on");
          
        check();
    });

    

    function check(){
        if(!main.classList.contains('show') && !user.classList.contains('showUser')){
            hamburger.classList.remove('fa-xmark', 'fa-2xl');
            
            background.classList.remove("on");
        }
    }

    background.onclick = function(){
        user.classList.remove('showUser');
        main.classList.remove('show');
        hamburger.classList.remove('fa-xmark', 'fa-2xl');
        
        background.classList.remove("on");
    }
    /*modificarlo*/
    let openModal = document.querySelector('#openModal');
    let closeModal = document.querySelector('#closeModal');
    let modal = document.querySelector('#modal');
    openModal.onclick = function(){
        modal.style.visibility = 'visible';
    }

    closeModal.onclick = function(){
        modal.style.visibility = 'hidden';
    }

    modal.onlick = function(){
        modal.style.visibility = 'hidden';
    }
});
