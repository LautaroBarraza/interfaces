class Figure {
    constructor(posX, posY, fill, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.param = false;
    }

     getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setSelected(value) {
        this.selected = value;
    }

    setSelectedStyle(style) {
        this.selectedStyle = style;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
    }

    setIsClickable(param) {};

    isPointedInside(x, y) {};

    isTokenInsideDroppingZone(figure) {};

    isTokenInside(figure) {};

    alreadyHasCircleInside() {};

    getPlayer() {};

    setTurn(param) {};

}