class Background {
    constructor(config){
        this.ctx = config.ctx;
        this.width = config.width;
        this.height = config.height;
        this.image = new Image();
        this.image.src = 'assets/media/spaceshooter/Backgrounds/black.png';
        this.x = 0;
        this.y = 0;
        this.speed = 5;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, canvas1.width, canvas1.height);
        ctx.drawImage(this.image, this.x, this.y - canvas1.height, canvas1.width, canvas1.height);
    }
    update(){
        this.y += this.speed;
        if (this.y > this.height) this.y = 0;
    }
}