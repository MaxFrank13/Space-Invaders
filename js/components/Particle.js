class Particle {
    constructor(config) {
        this.ctx = config.ctx;
        this.x = config.x;
        this.y = config.y;
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 4 - 2;
        this.color = config.color;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}