const canvas1 = document.querySelector(".canvas1");
const ctx = canvas1.getContext('2d');
canvas1.width = 800;
canvas1.height = 720;


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
            x: 400,
            y: 675
        },
        width: 25,
        height: 25,
        color: "blue"
    },
    missile: {
        ctx,
        type: "weapon",
        position: {
            x: 500,
            y: 500
        },
        width: 15,
        height: 15,
        color: "red"
    }
}

// Declare Game Objects

// Projectiles

const projectiles = [];

// Player
const player = new Player(config.player);
// Enemies
const enemies = generateEnemies();

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
        const newProjectile = player.shoot();
        player.ammo--;
        if (player.ammo > 0) projectiles.push(newProjectile);
    }
    // idea for 'magnetic level' where player is bound to one side of map
    // player.direction.unshift("right");
    
    // generate new wave of enemies
    if (e.code === "KeyG") {
        const newWave = generateEnemies();
        newWave.forEach(enemy => enemies.push(enemy));
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

// Game Setup Functions

function generateEnemies() {
    const enemyArray = [];
    for (let i = 0; i < 10; i++) {
        enemyArray.push(new Enemy({
            ctx,
            type: "enemy",
            position: {
                x: 200 + 40*i,
                y: 200 
            },
            width: 25,
            height: 25,
            color: "green"
        }))
    }
    return enemyArray;
}

// Collision Detection

// first object is projectile, second is player or enemy
function checkCollision(object1, object2) {
    if (
        object1.position.x > object2.position.x + object2.width ||
        object1.position.x + object1.width < object2.position.x ||
        object1.position.y > object2.position.y + object2.height ||
        object1.position.y + object1.height < object2.position.y 
    ) {
    } else {
        object1.hit = true;
        object2.hit = true;
    }
}


init();

function animate() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas1.width, canvas1.height);

    player.draw(player.ctx);
    player.update(player.direction[0]);

    enemies.forEach(item => {
        item.draw(ctx);
        item.update();
        checkCollision(item, player);
    })

    projectiles.forEach((projectile, index) => {
        if (!projectile.hit) {
            projectile.draw(ctx);
            projectile.update();
        } else {
            projectiles.splice(index, 1);
        }
        enemies.forEach(enemy => {
            checkCollision(projectile, enemy)
        })
    });


    // check for game over to cancel animation
    player.hit ? cancelAnimationFrame(animate) : requestAnimationFrame(animate);
}