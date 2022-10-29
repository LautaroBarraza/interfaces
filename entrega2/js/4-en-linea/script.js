"use strict"
document.addEventListener("DOMContentLoaded", cargar)
function cargar(){

    let canvas= document.querySelector("#canvas");
    
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext("2d");

    let figuras= [];
    let tablero= [];
    let imgTablero= '../../img/2.png';

    let dropZone=[];


    let columna = 7;
    let fila =6;
    const TAMPOSTABLERO= 50;
    const TAMFICHA = 20;
    let canvasWidht= canvas.width;
    let canvasHeight= canvas.height;

    let jugador1= new player("user1", 1);
    let jugador2 = new player("user2", 2)
    let fichasJugador1=[];
    let fichasJugador2=[];
    let cantidadFichas= fila*columna;

    let turno = jugador1;

    let ubicacionTableroX= (canvasWidht/2)-(((columna)*TAMPOSTABLERO)/2);
    let ubicacionTableroY= canvasHeight/2-(((TAMPOSTABLERO)*(fila))/2);


    let largoTablero= (columna * (TAMPOSTABLERO));
    let altoTablero= (fila * (TAMPOSTABLERO));

    function inInit(){
        clearCanvas();
        drawTablero();
        drawTokens();
        drawDropZone()
        setInterval(drawTokens, 20)
    }

    function initEvents(){
        canvas.onmousedown = mouseDown;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = mouseUp;
    }
    initEvents();
    inicializarTablero();

        function inicializarTablero(){
            let ubicacionFichaX= ubicacionTableroX;
            let ubicacionFichaY = ubicacionTableroY;
            for(let f=0;f<fila;f++){
                let aux= [];
                for (let c=0;c<columna;c++){
                    if(c==0){
                        ubicacionFichaX= ubicacionTableroX;
                    } 
                    let rect =addRectangulo(ubicacionFichaX, ubicacionFichaY); 
                    ubicacionFichaX += TAMPOSTABLERO;
                    aux.push(rect)
                }
                ubicacionFichaX -= (TAMPOSTABLERO)*columna+TAMPOSTABLERO;
                ubicacionFichaY += (TAMPOSTABLERO);
                figuras.push(aux);
            }
            drawDropZone();
            console.log(tablero);
            initTokens();
            console.log(fichasJugador1);
            console.log(fichasJugador2);
            console.log(figuras)
        }

        function drawDropZone(){
            for(let c=0;c<columna;c++){
                let x= ubicacionTableroX+(c*TAMPOSTABLERO);
                let y= ubicacionTableroY-TAMPOSTABLERO;
                let zona = new Rectangulo(x, y, TAMPOSTABLERO, ctx);
                zona.draw();
                dropZone.push(zona);
            }

        }

        function initTokens(){
            for(let i=0;i<cantidadFichas/2;i++){
                //fichas jugador 1
                    let posx=Math.round(Math.random() * (ubicacionTableroX - TAMPOSTABLERO*2) + TAMPOSTABLERO);
                    let posy=canvasHeight- Math.round(Math.random() * altoTablero) - TAMPOSTABLERO;
                    let fichaJugador1= new Circulo(posx,posy,TAMFICHA,ctx,jugador1);
                    fichasJugador1.push(fichaJugador1);
                //fichas jugador 2
                    posx=Math.round(Math.random() * ((canvasWidht-TAMPOSTABLERO*2) - (ubicacionTableroX+largoTablero+TAMPOSTABLERO)) + (ubicacionTableroX+largoTablero+TAMPOSTABLERO));
                    posy=canvasHeight - Math.round(Math.random() * altoTablero) - TAMPOSTABLERO;
                    let fichaJugador2= new Circulo(posx,posy,TAMFICHA,ctx,jugador2);
                    fichasJugador2.push(fichaJugador2);
            }
            drawTokens();
        }

        function drawTokens(){
            for(let i=0;i<fichasJugador1.length;i++){
                fichasJugador1[i].draw();
                fichasJugador2[i].draw();
            }
        }

        function clearCanvas(){
            ctx.clearRect(0,0, canvasWidht, canvasHeight);
        }

        function drawTablero(){
            for(let i=0;i<tablero.length;i++){
                tablero[i].draw();
            }

        }

        function addRectangulo(ubicacionFichaX, ubicacionFichaY){
            let rectangulo = new Rectangulo(ubicacionFichaX, ubicacionFichaY, TAMPOSTABLERO, ctx);
            tablero.push(rectangulo);
            drawTablero();
            return rectangulo;
        }



        //mouse events
        let lastTokenSelected;
        let isMouseDown = false;


        function mouseDown(event){
            isMouseDown=true;
            let coordsCanvas=canvas.getBoundingClientRect();
            let x =Math.round(event.clientX - coordsCanvas.left)
            let y =Math.round(event.clientY - coordsCanvas.top);
            if(lastTokenSelected!=null){
                lastTokenSelected.setIsSelected(false);
                lastTokenSelected=null;
            }

            let tokenSelected= findClickedToken(x,y);
            if(tokenSelected!=null && tokenSelected.getJugador()==turno){
                tokenSelected.setIsSelected(true);
                lastTokenSelected=tokenSelected;
            } 
        }

        function mouseMove(event){
            let coordsCanvas=canvas.getBoundingClientRect();
            let x =Math.round(event.clientX - coordsCanvas.left)
            let y =Math.round(event.clientY - coordsCanvas.top);
            if(isMouseDown && lastTokenSelected!=null){
                lastTokenSelected.move(x,y);
                
                inInit();
            }
        }

        function mouseUp(event){
            isMouseDown=false;
            let columna=checkDropZone();
            if(putToken(columna)){
                changeTurn();
            }
            
            
            if(lastTokenSelected!=null){
                lastTokenSelected.setIsSelected(false);
            }
            console.log(figuras)
        }

        function findClickedToken(x,y){
            if(turno==jugador1){
                for(let i=0;i<fichasJugador1.length;i++){
                    if(fichasJugador1[i].isClicked(x,y)){
                        return fichasJugador1[i];
                    }
                }
            }else{
                for(let i=0;i<fichasJugador2.length;i++){
                    if(fichasJugador2[i].isClicked(x,y)){
                        return fichasJugador2[i];
                    }
                }
            }

        }


        //zona drop

        function checkDropZone(){
            for(let i=0;i<dropZone.length;i++){
                if(dropZone[i].isDroppedInside(lastTokenSelected.getX(),lastTokenSelected.getY())){
                    console.log(i)
                    return i;
                }
            }
        }

        function putToken(columna){
            for(let i=0;i<fila;i++){
                let x= ubicacionTableroX+TAMFICHA+ (TAMPOSTABLERO*columna);
                let y= ubicacionTableroY+TAMFICHA + (TAMPOSTABLERO*i);
                if(i==fila-1 && !figuras[i][columna].getIsTokenInside()){
                    figuras[i][columna].setIsTokenInside(true);
                    lastTokenSelected.move(x,y);
                    lastTokenSelected.setCanMove(false);
                    inInit();
                    return true;
                }else{
                    if((!figuras[i][columna].getIsTokenInside())){
                        if(figuras[i+1][columna].getIsTokenInside()){
                            figuras[i][columna].setIsTokenInside(true);
                            lastTokenSelected.move(x,y);
                            lastTokenSelected.setCanMove(false);
                            inInit();
                            return true;
                        }
                    }
                }
            }
            return false;
        }


        //cambiar turno

        function changeTurn(){
            if(turno==jugador1){
                turno=jugador2;
            }else{
                turno=jugador1;
            }
        }

    }

    /*
    function draw(){
        for(let cantidad=0;cantidad<10;cantidad++){
            let x= Math.floor(Math.random()*900);
            let y= Math.floor(Math.random()*1000);
            if(Math.floor(Math.random()*2)==1){
                    let circulo = new Circulo(x, y, 100, canvas);
                    circulo.draw();
                    figuras.push(circulo);

            }else{
                let rectangulo = new Rectangulo(x, y, 300, 200, canvas);
                rectangulo.draw();
                figuras.push(rectangulo);
            }
        }
        console.log(figuras);
    }


    function buscarClick(e){
        let x= e.clientX;
        let y = e.clientY;
        for(let i=0;i<figuras.length;i++){
            if(figuras[i].isClick(x, y)){
                console.log(figuras[i].isClick(x, y))
                figuras[i].setColorVerde();
            }
        }

    }

    */



    //raiz[(punto1.x - cx)^2+(punto1.y-c.y)^2]   c es el punto centra

