'use strict'

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

