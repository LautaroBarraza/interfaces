'use strict'

document.querySelector('.icono-menu').addEventListener('click', toggleMenu);

function toggleMenu() {
    document.querySelector("nav").classList.toggle("show");
}