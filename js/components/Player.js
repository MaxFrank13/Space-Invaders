class Player extends GameObject {
    constructor(config) {
        super(config);
        this.direction = [];
        this.velocity = {
            y: 10,
            x: 10
        }
        this.ammo = 20;
        this.hitbox = {
            x: this.position.x + 10,
            y: this.position.y + 10,
            width: 79,
            height: 60,
        }
        this.controlled = true;
    }
    update(state){
        switch (state) {
            case "up":
                if (this.position.y > 400) {
                    this.position.y -= this.velocity.y;
                    this.hitbox.y -= this.velocity.y;
                } else {
                    this.position.y = 400;
                    this.hitbox.y = 420;
                }
                break;
            case "down":
                if (this.position.y + this.height < this.ctx.canvas.height) {
                    this.position.y += this.velocity.y;
                    this.hitbox.y += this.velocity.y;
                } else {
                    this.position.y = this.ctx.canvas.height - this.height;
                    this.hitbox.y = this.ctx.canvas.height - this.height;
                }
                break;
            case "left":
                if (this.position.x > 0) {
                    this.position.x -= this.velocity.x;
                    this.hitbox.x -= this.velocity.x;
                } else {
                    this.position.x = 0;
                    this.hitbox.x = 0;
                }
                break;
            case "right":
                if (this.position.x + this.width < this.ctx.canvas.width) {
                    this.position.x += this.velocity.x;
                    this.hitbox.x += this.velocity.x;
                } else {
                    this.position.x = this.ctx.canvas.width - this.width;
                    this.hitbox.x = this.ctx.canvas.width - this.width;
                }
                break;
        }
    }
    shoot(){
        return new Projectile({
            ctx: this.ctx,
            type: "weapon",
            position: {
                x: this.position.x + 43,
                y: this.position.y - 42
            },
            width: 13,
            height: 37,
            sprite: {
                src: 'assets/media/spaceshooter/PNG/Lasers/laserRed04.png'
            },
            color: "red"
        });
        
    }
}