"use strict"
document.addEventListener("DOMContentLoaded", load);
function load(){

    let canvas= document.querySelector("#canvas");
    
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext("2d");

    let figures = [];
    let board = [];
    let imgBoard = '../img/4-in-line/space.png';
    let imgPlayer1 = '../img/4-in-line/fichahades.png';
    let imgPlayer2 = '../img/4-in-line/fichaseiya.png';

    let dropZone = [];


    let numColumn = 10;
    let numRow = 9;
    const SIZEPOSBOARD = 50;
    const SIZETOKEN = 20;
    let canvasWidht = canvas.width;
    let canvasHeight = canvas.height;

    let player1 = new Player("user1", 1);
    let player2 = new Player("user2", 2);
    let tokensPlayer1 = [];
    let tokensPlayer2 = [];
    let amountTokens = numRow * numColumn;
    let tokensPlayed = 0;
    let inLine = 6;

    let playerTurn = player1;

    let locationBoardX = (canvasWidht/2)-(((numColumn)*SIZEPOSBOARD)/2);
    let locationBoardY = canvasHeight/2-(((SIZEPOSBOARD)*(numRow))/2);


    let widhtBoard = (numColumn * (SIZEPOSBOARD));
    let heightBoard = (numRow * (SIZEPOSBOARD));

    function redraw(){
        clearCanvas();
        drawBoard();
        drawTokens();
        drawDropZone();
        setInterval(drawTokens, 20);
    }

    function initEvents(){
        canvas.onmousedown = mouseDown;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = mouseUp;
    }

    initEvents();
    initBoard();

    //Crea y dibuja el tablero
    function initBoard(){
        tokensPlayed = 0;
        let locationTokenX = locationBoardX;
        let locationTokenY = locationBoardY;
        for(let row = 0; row < numRow; row++){
            let aux = [];
            for (let col = 0; col < numColumn; col++){
                if(col == 0){
                    locationTokenX = locationBoardX;
                } 
                let rect = addRect(locationTokenX, locationTokenY); 
                locationTokenX += SIZEPOSBOARD;
                aux.push(rect)
            }
            locationTokenX -= (SIZEPOSBOARD) * numColumn + SIZEPOSBOARD;
            locationTokenY += (SIZEPOSBOARD);
            figures.push(aux);
        }
        drawDropZone();
        console.log(board);
        initTokens();
        console.log(tokensPlayer1);
        console.log(tokensPlayer2);
        console.log(figures);
    }

    //Dibuja los espacios donde se van a soltar las fichas
    function drawDropZone(){
        for(let col = 0; col < numColumn; col++){
            let x = locationBoardX + (col * SIZEPOSBOARD);
            let y = locationBoardY - SIZEPOSBOARD;
            let zone = new Zone(x, y, SIZEPOSBOARD, ctx);
            zone.draw();
            dropZone.push(zone);
        }
    }

    //Crea las fichas de cada jugador y las coloca en cada lado
    function initTokens(){
        for(let i = 0; i < amountTokens/2; i++){
            //fichas jugador 1
            let posx = Math.round(Math.random() * (locationBoardX - SIZEPOSBOARD*2) + SIZEPOSBOARD);
            let posy = canvasHeight- Math.round(Math.random() * heightBoard) - SIZEPOSBOARD;
            let tokenPlayer1 = new Token(posx,posy,SIZETOKEN,ctx,player1);
            tokensPlayer1.push(tokenPlayer1);

            //fichas jugador 2
            posx = Math.round(Math.random() * ((canvasWidht-SIZEPOSBOARD*2) - (locationBoardX+widhtBoard+SIZEPOSBOARD)) + (locationBoardX+widhtBoard+SIZEPOSBOARD));
            posy = canvasHeight - Math.round(Math.random() * heightBoard) - SIZEPOSBOARD;
            let tokenPlayer2= new Token(posx,posy,SIZETOKEN,ctx,player2);
            tokensPlayer2.push(tokenPlayer2);
        }
        drawTokens();
    }

    //Dibuja las fichas de cada jugador
    function drawTokens(){
        for(let i = 0; i < tokensPlayer1.length; i++){
            tokensPlayer1[i].drawImg(imgPlayer1);
            tokensPlayer2[i].drawImg(imgPlayer2);
        }
    }

    function clearCanvas(){
        ctx.clearRect(0,0, canvasWidht, canvasHeight);
    }

    function drawBoard(){
        for(let i = 0; i < board.length; i++){
            board[i].drawImg(imgBoard);
        }
    }

    //agrega espacios donde caeran las fichas (tablero)
    function addRect(locationTokenX, locationTokenY){
        let rectangulo = new Zone(locationTokenX, locationTokenY, SIZEPOSBOARD, ctx);
        board.push(rectangulo);
        drawBoard();
        return rectangulo;
    }

    //mouse events
    let lastTokenSelected;
    let isMouseDown = false;

    function mouseDown(event){
        isMouseDown = true;
        let coordsCanvas = canvas.getBoundingClientRect();
        let x = Math.round(event.clientX - coordsCanvas.left);
        let y = Math.round(event.clientY - coordsCanvas.top);
        if(lastTokenSelected != null){
            lastTokenSelected.setIsSelected(false);
            lastTokenSelected = null;
        }

        let tokenSelected = findClickedToken(x, y);
        if(tokenSelected != null && tokenSelected.getPlayer() == playerTurn){
            tokenSelected.setIsSelected(true);
            lastTokenSelected = tokenSelected;
        } 
    }

    function mouseMove(event){
        let coordsCanvas = canvas.getBoundingClientRect();
        let x = Math.round(event.clientX - coordsCanvas.left);
        let y = Math.round(event.clientY - coordsCanvas.top);
        if(event.clientX < coordsCanvas.left || event.clientX > coordsCanvas.right || event.clientY < coordsCanvas.top || event.clientY > coordsCanvas.bottom){
            console.log("afuera");
            isMouseDown = false;
            moveTokenBack();
        }
        if(isMouseDown && lastTokenSelected != null){
            lastTokenSelected.move(x, y);
            redraw();
        }
    }

    function mouseUp(event){
        let coordsCanvas=canvas.getBoundingClientRect();
        let x = Math.round(event.clientX - coordsCanvas.left);
        let y = Math.round(event.clientY - coordsCanvas.top);
        isMouseDown = false;
        let column = checkDropZone();
        let row = putToken(column)
        if(row != false){
            checkWin(row, column);
            changeTurn();
        }else{
            moveTokenBack();
        }
        if(lastTokenSelected != null){
            lastTokenSelected.setIsSelected(false);
        }
        console.log(figures)
    }

    function moveTokenBack(){
        if(lastTokenSelected != null){
            if(lastTokenSelected.getPlayer() == player1){
                let posx = Math.round(Math.random() * (locationBoardX - SIZEPOSBOARD*2) + SIZEPOSBOARD);
                let posy = canvasHeight- Math.round(Math.random() * heightBoard) - SIZEPOSBOARD;
                lastTokenSelected.move(posx, posy);
            }else{
                let posx = Math.round(Math.random() * ((canvasWidht-SIZEPOSBOARD*2) - (locationBoardX+widhtBoard+SIZEPOSBOARD)) + (locationBoardX+widhtBoard+SIZEPOSBOARD));
                let posy = canvasHeight - Math.round(Math.random() * heightBoard) - SIZEPOSBOARD;
                lastTokenSelected.move(posx,posy);
            }
        }
        redraw();
    }

    //Buscar si se hizo click en una ficha con dichas coordenadas
    function findClickedToken(x, y){
        if(playerTurn == player1){
            for(let i = 0; i < tokensPlayer1.length; i++){
                if(tokensPlayer1[i].isClicked(x, y)){
                    return tokensPlayer1[i];
                }
            }
        }else{
            for(let i = 0; i < tokensPlayer2.length; i++){
                if(tokensPlayer2[i].isClicked(x, y)){
                    return tokensPlayer2[i];
                }
            }
        }
    }

    //chequea si la ultima ficha que se selecciono se encuentra dentro de la zona donde se sueltan las fichas
    function checkDropZone(){
        for(let i = 0; i < dropZone.length; i++){
            if(dropZone[i].isDroppedInside(lastTokenSelected.getX(),lastTokenSelected.getY())){
                console.log(i);
                return i;
            }
        }
    }

    //colocar ficha
    function putToken(column){
        if(column != undefined){
            for(let i = 0; i < numRow; i++){
                let x = locationBoardX + SIZETOKEN + (SIZEPOSBOARD * column);
                let y = locationBoardY + SIZETOKEN + (SIZEPOSBOARD * i);
                if((i == numRow-1) && (!figures[i][column].getIsTokenInside())){
                    figures[i][column].setIsTokenInside(true);
                    figures[i][column].setToken(lastTokenSelected);
                    lastTokenSelected.move(x + 5, y + 5);
                    lastTokenSelected.setCanMove(false);
                    tokensPlayed++;
                    redraw();
                    return i;
                }else{
                    if((!figures[i][column].getIsTokenInside())){
                        if(figures[i+1][column].getIsTokenInside()){
                            figures[i][column].setIsTokenInside(true);
                            figures[i][column].setToken(lastTokenSelected);
                            lastTokenSelected.move(x + 5, y + 5);
                            lastTokenSelected.setCanMove(false);
                            tokensPlayed++;
                            redraw();
                            return i;
                        }
                    }
                }
            }
            return false;
        }else{
            return false;
        }
    }

    //cambiar turno de jugador
    function changeTurn(){
        if(playerTurn == player1){
            playerTurn = player2;
        }else{
            playerTurn = player1;
        }
    }

    //********** LOGICA WIN *************//
    function checkWin(row, column){
        if(amountTokens == tokensPlayed){
            alert("empate")
            finishGame();
        }
        if(winRow(row, column) || winColumn(row, column) || winDiag(row, column)){
            alert("Gana: " + playerTurn.getNombre());
            finishGame();
        }
    }

    function finishGame(){
        for(let i = 0; i < tokensPlayer1.length; i++){
            tokensPlayer1[i].setCanMove(false);
            tokensPlayer2[i].setCanMove(false);
        }
    }

    //win diagonal//
    function winDiag(row, column){
        let leftDown = inLineLeftDown(row, column);
        let LeftUp = inLineLefttUp(row, column);
        let rightDown = inLineRightDown(row, column);
        let rightUp = inLineRightUp(row, column);
        if((leftDown + rightUp + 1 >= inLine) || (LeftUp + rightDown + 1 >= inLine)){
            return true;
        }
    }

    function inLineLeftDown(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(row+i < numRow && column-i > -1){
                let token = figures[row+i][column-i].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    function inLineLefttUp(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(row-i > -1 && column-i > -1){
                let token = figures[row-i][column-i].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    function inLineRightDown(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(row+i < numRow && column+i < numColumn){
                let token = figures[row+i][column+i].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    function inLineRightUp(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(row-i > -1 && column+i < numColumn){
                let token = figures[row-i][column+i].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    //win columna//
    function winColumn(row, column){
        let up = winColumnUp(row, column);
        let down = winColumnDown(row, column);
        if(up + down + 1 >= inLine){
            return true;
        }
    }

    function winColumnDown(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(row-i > -1){
                let token = figures[row-i][column].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    function winColumnUp(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(row+i < numRow){
                let token = figures[row+i][column].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    //win fila//
    function winRow(row, column){
        let left = winRowLeft(row, column);
        let right = winRowRight(row, column);
        if(left + right + 1 >= inLine){
            return true;
        }
    }

    function winRowLeft(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(column-i > -1){
                let token = figures[row][column-i].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    function winRowRight(row, column){
        let found = false;
        let i = 1;
        let count = 0;
        while(found != true){
            if(column+i < numColumn){
                let token = figures[row][column+i].getToken();
                if(token != null){
                    if (token.getPlayer() == lastTokenSelected.getPlayer()){
                        count++;
                    }else{
                        found = true;
                    }
                }else{
                    found = true;;
                }
            }else{
                found = true;
            }
            i++;
        }
        return count;
    }

    }
    /*
    function draw(){
        for(let count=0;count<10;count++){
            let x= Math.floor(Math.random()*900);
            let y= Math.floor(Math.random()*1000);
            if(Math.floor(Math.random()*2)==1){
                    let circulo = new Token(x, y, 100, canvas);
                    circulo.draw();
                    figures.push(circulo);

            }else{
                let rectangulo = new Zone(x, y, 300, 200, canvas);
                rectangulo.draw();
                figures.push(rectangulo);
            }
        }
        console.log(figures);
    }


    function buscarClick(e){
        let x= e.clientX;
        let y = e.clientY;
        for(let i=0;i<figures.length;i++){
            if(figures[i].isClick(x, y)){
                console.log(figures[i].isClick(x, y))
                figures[i].setColorVerde();
            }
        }

    }

    */



    //raiz[(punto1.x - cx)^2+(punto1.y-c.y)^2]   c es el punto centra

