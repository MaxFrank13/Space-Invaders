class Player extends GameObject {
    constructor(config) {
        super(config);
        this.direction = [];
        this.velocity = {
            y: 10,
            x: 10
        }
    }
    update(state){
        switch (state) {
            case "up":
                this.position.y -= this.velocity.y;
                break;
            case "down":
                this.position.y += this.velocity.y;
                break;
            case "left":
                this.position.x -= this.velocity.x;
                break;
            case "right":
                this.position.x += this.velocity.x;
                break;
        }
        this.draw(this.ctx);
    }
}