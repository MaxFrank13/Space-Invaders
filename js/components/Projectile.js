class Projectile extends GameObject {
    constructor(config) {
        super(config);
        // add direction for projectile to use in update switch
        this.velocity = {
            y: 8,
            x: 8
        }
    }
    update() {
        // add switch to check direction 'up' or 'down'
        if (this.position.y + this.height > 0) {
            this.position.y -= this.velocity.y;
        } else {
            this.hit = true;
        };
    }
}