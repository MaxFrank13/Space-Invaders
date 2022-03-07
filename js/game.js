// Canvas Context and Dimensions
const canvas1 = document.querySelector(".canvas1");
const ctx = canvas1.getContext('2d');
canvas1.width = 800;
canvas1.height = 720;

// Game Global Variables
let hitScore = 0;
let timeScore = 0;
let timerId;
let wave = 0;

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
        width: 99,
        height: 75,
        sprite: {
            src: 'assets/media/spaceshooter/PNG/playerShip1_blue.png'
        },
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
// Particles
const particles = [];

// Direction Input & Controls

window.addEventListener('keydown', (e) => {

    // player control
    const dir = player.direction;
    if (config.map[e.code] !== undefined && player.controlled) {
        const input = config.map[e.code];
        if (dir && dir.indexOf(input) === -1) {
            dir.unshift(input);
        }
    };
    // player abilities
    if (e.code === "Space" && player.controlled) {
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
                x: 60 * i,
                y: -50
            },
            width: 91,
            height: 91,
            sprite: {
                src: 'assets/media/spaceshooter/PNG/ufoGreen.png'
            },
            color: "green"
        }))
    }
    wave++;
    return enemyArray;
}

function deployAmmo() {
    const ammoArray = [];
    for (let i = 0; i < 4; i++) {
        ammoArray.push(new Ammo({
            ctx,
            type: "ammo",
            position: {
                x: Math.floor(Math.random() * (canvas1.width - player.width)),
                y: 400 + (Math.random() * 300)
            },
            width: 32,
            height: 32,
            sprite: {
                src: 'assets/media/spaceshooter/PNG/Power-ups/things_bronze.png'
            },
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
        object1.hitbox.x > object2.hitbox.x + object2.hitbox.width ||
        object1.hitbox.x + object1.hitbox.width < object2.hitbox.x ||
        object1.hitbox.y > object2.hitbox.y + object2.hitbox.height ||
        object1.hitbox.y + object1.hitbox.height < object2.hitbox.y
    ) {
        return false;
    } else {
        return true;
    }
}

function checkInvasion(enemyArray) {
    return enemyArray.find(enemy => enemy.invade)
}

// Game Start/End, Score and Timer 


function startGame() {
    startBtn.classList.add('hide');
    animate();
    timerId = setInterval(() => {
        timeScore++;
        if (timeScore % 4 === 0 && wave < 10) generateEnemies().forEach(enemy => enemies.push(enemy));
        if (timeScore % 6 === 0) deployAmmo().forEach(item => ammo.push(item));
    }, 1000)
}

function endGame() {
    clearInterval(timerId);
    explosion();
}

function explosion(color) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle({
            ctx,
            x: player.position.x + player.width / 2,
            y: player.position.y + player.height / 2,
            color
        }));
    }
    particles.forEach(particle => {
        particle.draw();
        particle.update();
    })
}


// Animation Loop

const background = new Background({
    ctx,
    width: canvas1.width,
    height: canvas1.height
})

function animate() {
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);

    // player.direction[0] = "up" ? background.speed += 0.01 : background.speed = 5;
    background.draw(background.ctx);
    background.update();

    player.draw(player.ctx);
    player.update(player.direction[0]);

    enemies.forEach(item => {
        item.draw(item.ctx);
        item.update();
        if (checkCollision(item, player)) {
            // play enemy explosion animation at enemy position
            player.hit = true;
        };
    })

    projectiles.forEach((projectile, index) => {
        enemies.forEach((enemy, enemyInd) => {
            if (checkCollision(projectile, enemy)) {
                // play enemy explosion animation at enemy position
                enemies.splice(enemyInd, 1);
                projectiles.splice(index, 1);
                hitScore++;
            }
        })
        projectile.draw(projectile.ctx);
        projectile.update();
    })

    ammo.forEach((item, index) => {
        item.draw(item.ctx);
        if (checkCollision(item, player)) {
            ammo.splice(index, 1);
            player.ammo += item.value;
        }
    })
    console.log(player.ammo, hitScore + timeScore);


    // check for game over to cancel animation

    if (
        player.hit ||
        checkInvasion(enemies) 
    ) {
        player.controlled = false;
        explosion('red');
    } else if (enemies.length === 0 && wave === 10) {
        explosion('green')
    }
    requestAnimationFrame(animate);
};