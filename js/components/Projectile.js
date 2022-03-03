// class Projectile {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.width = 15;
//         this.height = 15;
//         this.color = 'red';
//         this.velocity = {
//             y: 8,
//             x: 20
//         }
//     }
//     draw(ctx) {        
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//     update() {
//         this.y -= this.velocity.y;
//     }
// }
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
        if (this.position.y > 0) {
            this.position.y -= this.velocity.y;
        } else {
            this.hit = true;
        };
    }
}