class Ammo extends GameObject {
    constructor(config) {
        super(config);
        this.value = Math.floor(Math.random() * 3 + 2);
        if (this.value === 3) {
            this.sprite.image.src = 'assets/media/spaceshooter/PNG/Power-ups/things_silver.png'
        } else if (this.value === 4) {
            this.sprite.image.src = 'assets/media/spaceshooter/PNG/Power-ups/things_gold.png'
        }
    }

}