class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 15;
        this.color = 'red';
        this.hit = true;
        this.velocity = {
            y: 8,
            x: 20
        }
    }
    draw(ctx) {        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.y -= this.velocity.y;
    }
}