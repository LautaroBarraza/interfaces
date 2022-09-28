'use strict'

document.querySelector('.icon-main').addEventListener('click', () =>{
    document.querySelector(".nav").classList.toggle("show");
});
document.querySelector('.icon-user').addEventListener('click', () =>{
    document.querySelector(".user-nav").classList.toggle("showUser");
});


