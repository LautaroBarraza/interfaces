"use strict"

document.addEventListener("DOMContentLoaded", cargar);

function cargar(){
    const carruseles = [...document.querySelectorAll(".juego-carrusel")];
    console.log(carruseles);
    const nxtBtn = [...document.querySelectorAll(".categoria-boton-derecha")];
    const preBtn = [...document.querySelectorAll(".categoria-boton-izquierda")];

    carruseles.forEach((item,i)=> {
        let dimensionContenedor = item.getBoundingClientRect();
        let contenedorWidth = dimensionContenedor.width;

        nxtBtn[i].addEventListener("click", () => {
            item.scrollLeft += contenedorWidth;
        })

        preBtn[i].addEventListener("click", () => {
            item.scrollLeft -= contenedorWidth;
        })

    })
}