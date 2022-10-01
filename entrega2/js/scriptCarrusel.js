"use strict"

document.addEventListener("DOMContentLoaded", cargar);

function cargar(){
    const carruseles = [...document.querySelectorAll(".juego-carrusel")];
    console.log(carruseles);
    const nxtBtn = [...document.querySelectorAll(".categoria-boton-derecha")];
    const preBtn = [...document.querySelectorAll(".categoria-boton-izquierda")];
    const NAV_CARRUSEL = [...document.querySelectorAll(".pag-carrusel")];

    carruseles.forEach((item,i)=> {
        let dimensionContenedor = item.getBoundingClientRect();
        let contenedorWidth = dimensionContenedor.width;
        console.log(item.scrollWidth);
        console.log(contenedorWidth);
        console.log(item.scrollWidth/contenedorWidth)

        nxtBtn[i].addEventListener("click", () => {
            item.scrollLeft += contenedorWidth;
            let activo = NAV_CARRUSEL[i].querySelector(".activo");
            if(activo.nextSibling){
                activo.nextSibling.classList.add("activo");
                activo.classList.remove("activo");
            
            }
        })

        preBtn[i].addEventListener("click", () => {
            item.scrollLeft -= contenedorWidth;
            let activo = NAV_CARRUSEL[i].querySelector(".activo");
            if(activo.previousSibling){
                activo.previousSibling.classList.add("activo");
                activo.classList.remove("activo");
            }
        })

        let cantidad_nav=Math.trunc( item.scrollWidth/contenedorWidth);

        for(let j=-1;j<cantidad_nav;j++){
            let button = document.createElement("button");
            if(j===-1){
                button.classList.add("activo")
            }
            NAV_CARRUSEL[i].appendChild(button);
            button.addEventListener("click",(e) => {
                item.scrollLeft = contenedorWidth * (j+1);
                NAV_CARRUSEL[i].querySelector(".activo").classList.remove("activo");
                e.target.classList.add("activo");
            })
            
        }



    })
}