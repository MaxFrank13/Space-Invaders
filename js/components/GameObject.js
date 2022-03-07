class GameObject {
    constructor(config) {
        this.ctx = config.ctx;
        this.type = config.type;
        this.position = config.position;
        this.sprite = new Sprite(config.sprite);
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.hit = false;
        this.hitbox = {
            x: this.position.x,
            y: this.position.y,
            width: this.width,
            height: this.height
        }
    }
    draw(ctx) {
        ctx.drawImage(this.sprite.image, this.position.x, this.position.y);
    }
    update(){
        this.draw(this.ctx);
    }
}

