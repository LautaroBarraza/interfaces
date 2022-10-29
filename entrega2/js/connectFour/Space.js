class Space extends Figure{
    constructor(posX, posY, width, height, fill, ctx) {
        super(posX, posY, fill, ctx);
        this.urlimage = fill;
        this.image = new Image();
        this.width = width;
        this.height = height;
    }

    draw() {
        super.draw();
        if (this.image.src === "") {
            this.image.src = this.urlimage;
            let loadImg = function () {
                this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            }
            this.image.onload = loadImg.bind(this);

        } else {
            this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        }
    }

    isTokenInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }

    //celda ya ocupada
    alreadyHasCircleInside() {
        let cellWithFigureInside = false;
        for (let i = 0; i < figures.length; i++) {
            if (figures[i] != this) {
                if ((!(figures[i].getPosX() <= this.posX || figures[i].getPosX() >= this.posX + this.width || figures[i].getPosY() <= this.posY || figures[i].getPosY() >= this.posY + this.height)) == true) {
                    return true;
                }
            }

        }
        return cellWithFigureInside;
    }
    
    getPlayer() {
        if (this.alreadyHasCircleInside()) {
            //obtengo coordenadas de la ficha de adentro..
            let x = this.getPosX() + (SIZE_FIG / 2);
            let y = this.getPosY() + (SIZE_FIG / 2);

            for (let i = 0; i < figures.length; i++) {
                //busco que ficha es la que tiene esas coordenadas
                if ((figures[i].getPosX() == x) && (figures[i].getPosY() == y)) {
                    return figures[i].getPlayer();
                }
            }
        }
        return 0;
    }
}