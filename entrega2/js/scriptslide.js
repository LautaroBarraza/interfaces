"use strict"

document.addEventListener("DOMContentLoaded", cargar);

function cargar(){
    const carruseles = [...document.querySelectorAll(".game-slide")];
    console.log(carruseles);
    const nxtBtn = [...document.querySelectorAll(".category-button-right")];
    const preBtn = [...document.querySelectorAll(".category-button-left")];
    const NAV_CARRUSEL = [...document.querySelectorAll(".pag-slide")];

    carruseles.forEach((item,i)=> {
        let dimensionContenedor = item.getBoundingClientRect();
        let contenedorWidth = dimensionContenedor.width;
        console.log(item.scrollWidth);
        console.log(contenedorWidth);
        console.log(item.scrollWidth/contenedorWidth)

        nxtBtn[i].addEventListener("click", () => {
            item.scrollLeft += contenedorWidth;
            let activo = NAV_CARRUSEL[i].querySelector(".active");
            if(activo.nextSibling){
                activo.nextSibling.classList.add("active");
                activo.classList.remove("active");
            
            }
        })

        preBtn[i].addEventListener("click", () => {
            item.scrollLeft -= contenedorWidth;
            let activo = NAV_CARRUSEL[i].querySelector(".active");
            if(activo.previousSibling){
                activo.previousSibling.classList.add("active");
                activo.classList.remove("active");
            }
        })

        let cantidad_nav=Math.trunc( item.scrollWidth/contenedorWidth);

        for(let j=-1;j<cantidad_nav;j++){
            let button = document.createElement("button");
            if(j===-1){
                button.classList.add("active")
            }
            NAV_CARRUSEL[i].appendChild(button);
            button.addEventListener("click",(e) => {
                item.scrollLeft = contenedorWidth * (j+1);
                NAV_CARRUSEL[i].querySelector(".active").classList.remove("active");
                e.target.classList.add("active");
            })
            
        }



    })
}