// Canvas Context and Dimensions
const canvas1 = document.querySelector(".canvas1");
const ctx = canvas1.getContext('2d');
canvas1.width = 800;
canvas1.height = 720;

// Control Panel
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const fireBtn = document.querySelector(".fire");

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", () => {
    window.location.reload(true);
});
fireBtn.addEventListener("click", playerShoot);

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
    }
}

// Declare Game Objects

// Projectiles

const projectiles = [];

// Player
const player = new Player(config.player);
// Enemies
const enemies = generateEnemies();
// Ammo
const ammo = deployAmmo();

// Direction Input & Controls

window.addEventListener('keydown', (e) => {
    
    // player control
    const dir = player.direction;
    if (config.map[e.code] !== undefined) {
        const input = config.map[e.code];
        if (dir && dir.indexOf(input) === -1) {
            dir.unshift(input);
        }
    };
    // player abilities
    if (e.code === "Space") {
        playerShoot();
    }
    // idea for 'magnetic level' where player is bound to one side of map
    // player.direction.unshift("right");
});
window.addEventListener('keyup', (e) => {
    // player control
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
                x: 40 * i,
                y: -50
            },
            width: 25,
            height: 25,
            color: "green"
        }))
    }
    return enemyArray;
}

function deployAmmo() {
    const ammoArray = [];
    for (let i = 0; i < 4; i++) {
        ammoArray.push(new Ammo({
            ctx,
            type: "ammo",
            position: {
                x: Math.random() * canvas1.width - player.width,
                y: 400 + (Math.random() * 300)
            },
            width: 18,
            height: 18,
            color: "pink"
        }))
    }
    return ammoArray;
}

// Projectile

function playerShoot() {
    const newProjectile = player.shoot();
    if (player.ammo > 0) {
        projectiles.push(newProjectile);
        player.ammo--;
    }
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
        return false;
    } else {
        return true;
    }
}

// Game Start/End, Score and Timer 

let hitScore = 0;
let timeScore = 0;
let timerId;

function startGame() {
    startBtn.classList.add('hide');
    animate();
    timerId = setInterval(() => {
        timeScore++;
        if (timeScore % 4 === 0) generateEnemies().forEach(enemy => enemies.push(enemy));
        if (timeScore % 7 === 0) deployAmmo().forEach(item => ammo.push(item));
    }, 1000)
}

function endGame() {
    clearInterval(timerId);
    cancelAnimationFrame(animate);
}


// Animation Loop


function animate() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas1.width, canvas1.height);

    player.draw(ctx);
    player.update(player.direction[0]);

    enemies.forEach(item => {
        item.draw(ctx);
        item.update();
        if (checkCollision(item, player)) {
            player.hit = true;
        };
    })

    projectiles.forEach((projectile, index) => {
        enemies.forEach((enemy, enemyInd) => {
            if (checkCollision(projectile, enemy)) {
                enemies.splice(enemyInd, 1);
                projectiles.splice(index, 1);
                hitScore++;
            }
        })
        projectile.draw(ctx);
        projectile.update();
    })

    ammo.forEach((item, index) => {
        item.draw(ctx);
        if (checkCollision(item, player)) {
            ammo.splice(index, 1);
            player.ammo += item.value;
        }
    })
    console.log(player.ammo, hitScore + timeScore);

    // check for game over to cancel animation
    player.hit ? endGame() : requestAnimationFrame(animate);
};