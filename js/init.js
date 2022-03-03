const canvas1 = document.querySelector(".canvas1");
const ctx = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
})

const init = () => {
    animate();

}

// Game Configuration

const config = {
    map: {
        "ArrowUp": "up",
        "KeyW": "up",
        "ArrowDown": "down",
        "KeyS": "down",
        "ArrowLeft": "left",
        "KeyA": "left",
        "ArrowRight": "right",
        "KeyD": "right"
    },
    player: {
        ctx,
        type: "player",
        position: {
            x: 250,
            y: 250
        },
        width: 75,
        height: 75,
        color: "blue"
    },
    missile: {
        ctx,
        type: "weapon",
        position: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        width: 15,
        height: 15,
        color: "red"
    }
}

// Scene

const scene = [];

// Declare Game Objects

const player = new Player(config.player);
// scene.push(player);

// Direction Input for Player

window.addEventListener('keydown', (e) => {
    const dir = player.direction;
    if (config.map[e.code] !== undefined) {
        const input = config.map[e.code];
        if (dir && dir.indexOf(input) === -1) {
           dir.unshift(input);
        }
    };
    if (e.code === "Space") {
        console.log('pushing')
        scene.push(new Projectile(window.innerWidth / 2, window.innerHeight / 2));
    }
});
window.addEventListener('keyup', (e) => {
    const dir = player.direction;
    if (config.map[e.code] !== undefined) {
        const input = config.map[e.code]
        const index = dir.indexOf(input);
        if (index > -1) {
           dir.splice(index, 1);
        }
    }
});

init();

function animate() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas1.width, canvas1.height);
    scene.forEach((item, index) => {
            if (item.y > 0 ) {
                console.log(config.missile);
                item.draw(ctx);
                item.update();
            } else {
                console.log(config.missile);
                scene.splice(index, 1);
            }
    });
    console.log(scene);
    player.draw(player.ctx);
    player.update(player.direction[0]);
    requestAnimationFrame(animate);
}