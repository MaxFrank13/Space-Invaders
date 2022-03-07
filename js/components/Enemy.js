class Enemy extends GameObject {
    constructor(config) {
        super(config);
        this.direction = 'right';
        this.velocity = {
            x: 10,
            y: 1
        }
        this.hitbox = {
            x: this.position.x + 5,
            y: this.position.y + 15,
            width: 80,
            height: 60
        }
    }
    update() {
        if (this.position.y + this.height >= this.ctx.canvas.height) {
            this.invade = true;
        }
        switch (this.direction) {
            case 'right':
                if (this.position.x + this.width > this.ctx.canvas.width) {
                    this.direction = 'left';
                } else {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.hitbox.x += this.velocity.x;
                    this.hitbox.y += this.velocity.y;
                }
                break;
            case 'left':
                if (this.position.x < 0) {
                    this.direction = 'right';
                } else {
                    this.position.x -= this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.hitbox.x -= this.velocity.x;
                    this.hitbox.y += this.velocity.y;
                }
                break;
        }
    }
}