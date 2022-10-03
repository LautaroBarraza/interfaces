'use strict'

document.addEventListener("DOMContentLoaded", function (){
    const carousel = document.querySelector('.game-galery');
    const lbtn = document.querySelector('.carousel-button-left');
    const nbtn = document.querySelector('.carousel-button-right');
    const pagination = document.querySelector('.pag-slide');

    let containter = carousel.getBoundingClientRect();
    let containerWidth = containter.width;

    console.log(carousel.scrollWidth);
    console.log(containerWidth);
    console.log(carousel.scrollWidth/containerWidth);

    nbtn.addEventListener('click', () =>{
        let active = pagination.querySelector('.active');
        if(active.nextSibling){
            carousel.scrollLeft += containerWidth;
            active.nextSibling.classList.add('active');
            active.classList.remove('active');
        }else{
            carousel.scrollLeft = 0;
            pagination.firstElementChild.classList.add('active');
            pagination.lastElementChild.classList.remove('active');
        }
        
    });

    lbtn.addEventListener('click', () =>{
        carousel.scrollLeft -= containerWidth;
        let active = pagination.querySelector('.active');
        if(active.previousSibling){
            active.previousSibling.classList.add('active');
            active.classList.remove('active');
        }else{
            carousel.scrollLeft = carousel.scrollWidth;
            pagination.lastElementChild.classList.add('active');
            pagination.firstElementChild.classList.remove('active');
        }
    });

    let buttons = Math.trunc(carousel.scrollWidth/containerWidth);
    for(let j = -1; j < buttons; j++){
        let button = document.createElement("button");
        if(j === -1) {
            button.classList.add("active")
        }
        pagination.appendChild(button);

        button.addEventListener("click",(e) => {
            carousel.scrollLeft = containerWidth * (j + 1);
            pagination.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
        });
        
    }
});