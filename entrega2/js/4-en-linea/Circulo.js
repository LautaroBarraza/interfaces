class Circulo{

    constructor(x, y, radio, ctx, jugador){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.ctx = ctx;
        this.jugador=jugador;
        this.Selected=false;
        this.canMove=true;
    }

    getJugador(){
        return this.jugador;
    }

    setCanMove(boolean){
        this.canMove=boolean;
    }

    isSelected(){
        return this.isSelected;
    }

    setIsSelected(boolean){
        this.Selected=boolean;
    }

    getX(){
        return this.x;
    }

    setX(x){
        this.x= x;
    }

    getY(){
        return this.y;
    }
    setY(y){
        this.y=y;
    }
    getRadio(){
        return this.radio;
    }
    setRadio(radio){
        this.radio=radio;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x , this.y , this.radio , 0, 2 * Math.PI);
        this.ctx.fillStyle = "blue";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    isClicked(x,y){
        if(this.canMove){
            let distancia = Math.sqrt(Math.pow(x-this.x, 2)+ Math.pow(y-this.y, 2));
            if(distancia>this.radio){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    }

    move(x,y){
        this.x=x;
        this.y=y;
    }

    //raiz[(punto1.x - cx)^2+(punto1.y-c.y)^2]   c es el punto centra
}