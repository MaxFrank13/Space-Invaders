class GameObject {
    constructor(config) {
        this.ctx = config.ctx;
        this.type = config.type;
        this.position = config.position;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.hit = false;
    }
    draw(ctx) {        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        this.draw(this.ctx);
    }
}

