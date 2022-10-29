'use strict'

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let boardColumns = 8;
let boardRows = 7;

let MAX_FIG = boardColumns * boardRows;
const SIZE_FIG = 50;
const CONNECT = 4;

const imgPlayer1 = '../img/connectFour/fichaseiya.png';
const imgPlayer2 = '../img/connectFour/fichahades.png';
const imgSpace = '../img/connectFour/space.png';

const posXP1 = 450;
const posYP1 = SIZE_FIG - 10;
let id_P1 = null;

const posXP2 = 500 + SIZE_FIG;
const posYP2 = SIZE_FIG - 10;
let id_P2 = null;

let boardWidth = (canvasWidth / 2) - (boardColumns / 2) * SIZE_FIG - SIZE_FIG;
let boardHeight = (canvasHeight / 2) - (boardRows / 2) * SIZE_FIG - SIZE_FIG;

let tokensWidth = boardWidth;
let tokensHeight = canvasHeight / 2;

let dropTokensWidth = boardWidth;
let dropTokensHeight = boardHeight - SIZE_FIG;


//cordenadas "botones" en canvas 
let btnRestartX = canvasWidth - 128;
let btnRestartY = 40;

let figures = [];
let tokensPlayed = 0;
let lastClickedFigure = null;
let isMouseDown = false;

init();

function init(){
    MAX_FIG = boardColumns * boardRows;
    boardWidth = (canvasWidth / 2) - (boardColumns / 2) * SIZE_FIG - SIZE_FIG;
    boardHeight = (canvasHeight / 2) - ((boardRows+1)/2)  * SIZE_FIG + SIZE_FIG;

    dropTokensWidth = boardWidth;
    dropTokensHeight = boardHeight - SIZE_FIG;

    tokensWidth = boardWidth;
    tokensHeight = canvasHeight / 2;

    for(let x = 0; x < boardRows; x++){
        for(let y = 0; y < boardColumns; y++){
            boardWidth += SIZE_FIG;
            addSpace(boardWidth, boardHeight);
        }
        boardWidth -= SIZE_FIG * boardColumns;
        boardHeight += SIZE_FIG;
    }

    for(let x = 0; x < boardColumns; x++){
        dropTokensWidth += SIZE_FIG;
        addDropZone(dropTokensWidth, dropTokensHeight);
    }

    for(let i = 0; i < MAX_FIG / 2; i++){
        let posX = SIZE_FIG / 2 + Math.round(Math.random() * tokensWidth);
        let posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * tokensHeight);
        let img = imgPlayer1;
        addToken(img, true, 1, posX, posY);

        posX = canvasWidth - SIZE_FIG / 2 - Math.round(Math.random() * tokensWidth);
        posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * tokensHeight);
        img = imgPlayer2;
        addToken(img, true, 2, posX, posY);
    }

    addTokenTurn(imgPlayer1, true, 1, posXP1, posYP1);
    id_P1 = getFigureByCoord(posXP1, posYP1);
    figures[id_P1].setIsClickable(false);
    figures[id_P1].setSelected(true);

    addTokenTurn(imgPlayer2, true, 2, posXP2, posYP2);
    id_P2 = getFigureByCoord(posXP2, posYP2);
    figures[id_P2].setIsClickable(false);
    figures[id_P2].setSelected(true);

    drawFigures();
    console.log(figures)

    canvas.addEventListener("mousedown", onmousedown, false);
    canvas.addEventListener("mousemove", onmousemove, false);
    canvas.addEventListener("mouseup", onmouseup, false);
}

function addSpace(x, y){
    let img = imgSpace;
    let space = new Space(x, y, SIZE_FIG, SIZE_FIG, img, ctx);
    figures.push(space);
}

function addDropZone(x, y){
    let dropZone = new DropZone(x, y, SIZE_FIG, SIZE_FIG, 'white', ctx);
    figures.push(dropZone);
}

function addTokenTurn(img, turn, player, x, y){
    let token = new Token(player, turn, x, y, ((SIZE_FIG/2) + 40) * .5, img, ctx);
    figures.push(token);
}

function addToken(img, turn, player, x, y){
    let token = new Token(player, turn, x, y, ((SIZE_FIG/2) + 20) * .5, img, ctx);
    figures.push(token);
}

function getFigureByCoord(x, y) {
    for (let i = 0; i < figures.length; i++) {
        if (figures[i].getPosX() == x && figures[i].getPosY() == y) {
            return i;
        }
    }
    return null;
}

function onmousedown(event){
    isMouseDown = true;
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    if(lastClickedFigure != null){
        lastClickedFigure.setSelected(false);
        lastClickedFigure = null;
    }

    let clickedFigure = findClickedFigure(x, y);
    if(clickedFigure != null){
        clickedFigure.setSelected(true);
        lastClickedFigure = clickedFigure;
    }

    //CLICKS EN BOTONES... MAS ADELANTE...
    //Hizo click en reiniciar?
    if ((event.layerX >= btnRestartX) && (event.layerY <= btnRestartY)) {
        figures = [];
        init();
    }
    
    drawFigures();
}

function onmousemove(event){
    let x = event.layerX - event.currentTarget.offsetLeft;
    let y = event.layerY - event.currentTarget.offsetTop;
    if(isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(x, y);
        drawFigures();
        if(lastClickedFigure != null){
            lastClickedFigure.draw(ctx);
        }
    }
}

function onmouseup(event){
    isMouseDown = false;
    if(lastClickedFigure != null){
        if(isInDropZone(lastClickedFigure)){
            if(isGameOver(lastClickedFigure)){
                endGame();
                drawFigures();
                return;
            }
        }else if(isInBoard(lastClickedFigure)){
            console.log("figura arriba del tablero");
        }
        lastClickedFigure.setSelected(false);
    }
    drawFigures();
}

function drawFigures() {
    clearCanvas();
    addButtons();
    
    for (let i = 0; i < figures.length; i++) {
        if (figures[i] != lastClickedFigure) {
            figures[i].draw(ctx);
        }
    }
    if (lastClickedFigure != null) {
        lastClickedFigure.draw(ctx);
    }
    
}

function clearCanvas(){
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
}

function addButtons() {
    ctx.font = "28px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Reiniciar", btnRestartX, btnRestartY);
}

function findClickedFigure(x, y) {
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if (element.isPointedInside(x, y)) {
            return element;
        }
    }
}
/////////////////////LOGICA//////////////////////////
//Checkeo si una ficha fue soltada en la zona habilitada para realizar jugada!
function isInDropZone(lastDroppedFigure) {
    let condition = false;
    for (let i = 0; i < figures.length; i++) {
        let token = figures[i];
        if (token.isTokenInsideDroppingZone(lastDroppedFigure)) {
            if (placeDroppedToken(lastDroppedFigure)) {
                switchPlayerTurns(lastDroppedFigure)
                condition = true;
                return true;
            }
        }
    }
    if(condition == false){
        returnTokenToSite(lastDroppedFigure);
        return false;
    }
    
}

//Si una ficha fue soltada arriba del tablero la corro para que no estorbe!
function isInBoard(token) {
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if (element.isTokenInside(token.getPosX(), token.getPosY())) {
            //Si la ficha es ubicada en el tablero, devuelve la ficha a la pila de fichas
            returnTokenToSite(token);
            return true;
        }
    }
    return false;
}

function returnTokenToSite(token){
    if(token.getPlayer() === 1){
        token.setPosition(SIZE_FIG / 2 + Math.round(Math.random() * tokensWidth), canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * tokensHeight));
    }else if(token.getPlayer() === 2){    
        token.setPosition(canvasWidth - SIZE_FIG / 2 - Math.round(Math.random() * tokensWidth), canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * tokensHeight));
    }
}

    
//Ubico la ficha depositada en la dropping zone donde corresponda!
function placeDroppedToken(lastDroppedFigure) {
    let dropped = false;
    //itero de atras para adelante para checkear de abajo hacia arriba si hay fichas en el tablero
    for (let i = figures.length - 1; i >= 0; i--) {
        //me aseguro de estar checkeando unicamente celdas del tablero y no una ficha random en la misma altura por ejemplo
        if (
            figures[i].getPosX() == lastDroppedFigure.getPosX() && // (figura en la misma columna que la ficha)
            figures[i].getPosY() > lastDroppedFigure.getPosY() && // (figura no tiene que estar arriba del tablero) 
            figures[i].getPosY() < boardHeight + boardRows * (SIZE_FIG + 1) //(la figura no puede estar abajo del tablero)
        ) {
            //celda vacia? -> si: ubico la ficha en esa nueva pos 
            if (!figures[i].alreadyHasCircleInside()) {
                dropped = true;
                lastDroppedFigure.setIsClickable(false);
                lastDroppedFigure.setPosition(
                    figures[i].getPosX() + SIZE_FIG / 2,
                    figures[i].getPosY() + SIZE_FIG / 2
                );
                tokensPlayed++;
                return true;
            }
        }
    }
    if (dropped == false) {
        lastDroppedFigure.setIsClickable(true);
        lastDroppedFigure.setPosition(lastDroppedFigure.getPosX() + SIZE_FIG / 2, boardHeight + SIZE_FIG);
        return false;
    }
}

function switchPlayerTurns(lastDroppedFigure) {
    let player = lastDroppedFigure.getPlayer();
    for (let i = 0; i < figures.length; i++) {
        if (figures[i].getPlayer() == player) {
            figures[i].setTurn(false);
            figures[id_P1].setSelected(true);
            figures[id_P2].setSelected(false);

        } else {
            figures[i].setTurn(true);
            figures[id_P1].setSelected(false);
            figures[id_P2].setSelected(true);
        }
    }
}

//Checkear despues de cada ficha colocada si se terminó el juego
function isGameOver(lastFigureInserted) {
    if (
        isWinnerByFil(lastFigureInserted) ||
        isWinnerByCol(lastFigureInserted) ||
        isWinnerByDiagonal(lastFigureInserted)
    ) {
        return true;
    }
    if (isTieGame()) {
        alert("Juego Empatado!");
        return true;
    }
    return false;
}

function isTieGame() {
    if (tokensPlayed == MAX_FIG) {
        return true;
    }
}

function isWinnerByFil(lastFigureInserted) {
    let x = lastClickedFigure.getPosX() - SIZE_FIG / 2; //posX de la celda que contiene la ultima ficha insertada!
    let y = lastFigureInserted.getPosY() - SIZE_FIG / 2; //posY de la celda que contiene la ultima ficha insertada!
    let player = lastFigureInserted.getPlayer();
    let paintWinner = false;

    let leftRowCount = recuRowLeft(x, y, player, lastFigureInserted, paintWinner);
    let rightRowCount = recuRowRight(x, y, player, lastFigureInserted, paintWinner);

    if ((leftRowCount + rightRowCount - 1) >= CONNECT) {
        paintWinner = true;
        leftRowCount = recuRowLeft(x, y, player, lastFigureInserted, paintWinner);
        rightRowCount = recuRowRight(x, y, player, lastFigureInserted, paintWinner);
        return true;
    }
}

function recuRowLeft(x, y, player, lastFigureInserted, paintWinner) {
    //Estoy dentro del tablero?
    if (x > boardWidth) {
        //checkeo si es el mismo jug
        let indexCell = getFigureByCoord(x, y);
        if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
            if (paintWinner == true) {
                indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                figures[indexCell].setSelected(true);
                figures[indexCell].setSelectedStyle("green");
            }
            return recuRowLeft(x - SIZE_FIG, y, player, lastFigureInserted, paintWinner) + 1;
        }
        return 0;
    }
    return 0;
}

function recuRowRight(x, y, player, lastFigureInserted, paintWinner) {
    //Estoy dentro del tablero?
    if (x <= boardWidth + (SIZE_FIG * boardColumns)) {
        //checkeo si es el mismo jug
        let indexCell = getFigureByCoord(x, y);
        if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
            if (paintWinner == true) {
                indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                figures[indexCell].setSelected(true);
                figures[indexCell].setSelectedStyle("green");
            }
            return recuRowRight(x + SIZE_FIG, y, player, lastFigureInserted, paintWinner) + 1;
        }
        return 0;
    }
    return 0;
}

function isWinnerByCol(lastFigureInserted) {
    let x = lastFigureInserted.getPosX();
    let y = lastFigureInserted.getPosY();
    let player = lastFigureInserted.getPlayer();
    let paintWinner = false;

    if (recuCol(x, y, player, lastFigureInserted, paintWinner) >= CONNECT) {
        paintWinner = true;
        return true;
    }
}

function recuCol(x, y, player, lastFigureInserted, paintWinner) {
    //Estoy dentro del tablero?
    if (y < boardHeight) {
        let indexCell = getFigureByCoord(x, y);
        //checkeo si es el mismo jug
        if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
            if (paintWinner == true) {
                indexCell = getFigureByCoord(x, y);
                figures[indexCell].setSelected(true);
                figures[indexCell].setSelectedStyle("green");
            }
            return recuCol(x, y + SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
        }
        return 0;
    }
    return 0;
}


function isWinnerByDiagonal(lastFigureInserted) {
    let x = lastClickedFigure.getPosX() - SIZE_FIG / 2; //posX de la celda que contiene la ultima ficha insertada!
    let y = lastFigureInserted.getPosY() - SIZE_FIG / 2; //posY de la celda que contiene la ultima ficha insertada!
    let player = lastFigureInserted.getPlayer();
    let paintWinner = false;

    let leftUpDiag = recuDiagLeftUp(x, y, player, lastFigureInserted, paintWinner);
    let rightDownDiag = recuDiagRightDown(x, y, player, lastFigureInserted, paintWinner);

    let rightUpDiag = recuDiagRightUp(x, y, player, lastFigureInserted, paintWinner);
    let leftDownDiag = recuDiagLeftDown(x, y, player, lastFigureInserted, paintWinner);

    if ((leftUpDiag + rightDownDiag - 1) >= CONNECT) {
        paintWinner = true;
        leftUpDiag = recuDiagLeftUp(x, y, player, lastFigureInserted, paintWinner);
        rightDownDiag = recuDiagRightDown(x, y, player, lastFigureInserted, paintWinner);
        return true;
    }

    if ((rightUpDiag + leftDownDiag - 1) >= CONNECT) {
        paintWinner = true;
        rightUpDiag = recuDiagRightUp(x, y, player, lastFigureInserted, paintWinner);
        leftDownDiag = recuDiagLeftDown(x, y, player, lastFigureInserted, paintWinner);
        return true;
    }
}






function recuDiagRightUp(x, y, player, lastFigureInserted, paintWinner) {
    //Estoy dentro del tablero?
    if ((y >= boardHeight - (boardRows * SIZE_FIG)) && (x <= (boardWidth + (boardColumns * SIZE_FIG)))) {
        //checkeo si es el mismo jug
        let indexCell = getFigureByCoord(x, y);
        if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
            if (paintWinner == true) {
                indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                figures[indexCell].setSelected(true);
                figures[indexCell].setSelectedStyle("green");
            }
            return recuDiagRightUp(x + SIZE_FIG, y - SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
        }
        return 0;
    }
    return 0;
}

function recuDiagRightDown(x, y, player, lastFigureInserted, paintWinner) {
    //Estoy dentro del tablero?
    if ((y < boardHeight) && (x <= (boardWidth + (boardColumns * SIZE_FIG)))) {
        //checkeo si es el mismo jug
        let indexCell = getFigureByCoord(x, y);
        if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
            if (paintWinner == true) {
                indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                figures[indexCell].setSelected(true);
                figures[indexCell].setSelectedStyle("green");
            }
            return recuDiagRightDown(x + SIZE_FIG, y + SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
        }
        return 0;
    }
    return 0;
}

function recuDiagLeftDown(x, y, player, lastFigureInserted, paintWinner) {
    //Estoy dentro del tablero?
    if ((y < boardHeight) && (x > boardWidth)) {
        //checkeo si es el mismo jug
        let indexCell = getFigureByCoord(x, y);
        if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
            if (paintWinner == true) {
                indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                figures[indexCell].setSelected(true);
                figures[indexCell].setSelectedStyle("green");
            }
            return recuDiagLeftDown(x - SIZE_FIG, y + SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
        }
        return 0;
    }
    return 0;
}

function recuDiagLeftUp(x, y, player, lastFigureInserted, paintWinner) {
    //Estoy dentro del tablero?
    if ((y >= boardHeight - (boardRows * SIZE_FIG) && (x > boardWidth))) {
        //checkeo si es el mismo jug
        let indexCell = getFigureByCoord(x, y);
        if (figures[indexCell].getPlayer() == lastFigureInserted.getPlayer()) {
            if (paintWinner == true) {
                indexCell = getFigureByCoord(x + (SIZE_FIG / 2), y + (SIZE_FIG / 2));
                figures[indexCell].setSelected(true);
                figures[indexCell].setSelectedStyle("green");
            }
            return recuDiagLeftUp(x - SIZE_FIG, y - SIZE_FIG, player, lastFigureInserted, paintWinner) + 1;
        }
        return 0;
    }
    return 0;
}

//Desabilitar el movimiento de todas las fichas, usado cuando termina el juego
function endGame() {
    for (let i = 0; i < figures.length; i++) {
        figures[i].setIsClickable(false);
    }
    figures[id_P1].setSelected(false);
    figures[id_P2].setSelected(false);
}


