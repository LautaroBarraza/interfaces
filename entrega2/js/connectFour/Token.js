class Token extends Figure{
    constructor(player, turn, posX, posY, radius, fill, ctx) {
        super(posX, posY, fill, ctx);
        this.player = player;
        this.turn = turn;
        this.isClickable = true;
        this.selected = false;
        this.selectedStyle = "yellow";
        this.radius = radius;
        this.urlimage = fill;
        this.image = new Image();
    }

    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);

        if (this.image.src === "") {
            this.image.src = this.urlimage;
            let loadImg = function () {
                this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius / .5, this.radius / .5);
            }
            this.image.onload = loadImg.bind(this);
        } else {
            this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius / .5, this.radius / .5);
        }

        if (this.selected === true) {
            this.ctx.strokeStyle = this.selectedStyle;
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }

    isPointedInside(x, y){
        if(this.isClickable == true && this.turn == true){
            let _x = this.posX - x;
            let _y = this.posY - y;
            return Math.sqrt(_x * _x + _y * _y) < this.radius;
        }
    }

    getRadius() {
        return this.radius;
    }

    getPlayer() {
        return this.player;
    }

    setIsClickable(param) {
        this.isClickable = param;
    }

    setTurn(param) {
        this.turn = param;
    }
}
