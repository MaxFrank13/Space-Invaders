class Ammo extends GameObject {
    constructor(config) {
        super(config);
        this.value = Math.floor(Math.random() * 3 + 2);
    }
}