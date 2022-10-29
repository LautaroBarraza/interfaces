class DropZone extends Figure {

    constructor(posX, posY, width, height, fill, ctx) {
        super(posX, posY, fill, ctx);
        this.width = width;
        this.height = height;
    }

    draw() {
        super.draw();
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        
    }

    isTokenInsideDroppingZone(figure) {
        let x = figure.getPosX();
        let y = figure.getPosY();
        let isInside = !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
        
        if (isInside == true) {
            figure.setPosition(this.posX, this.posY);
        }
        return isInside;
    }
}