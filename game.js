// ======================================================
// Wild Frontier
// Version 0.1
// Moteur principal
// ======================================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const world = {
    width: 5000,
    height: 5000
};

const player = {
    x: 2500,
    y: 2500,
    width: 32,
    height: 32,
    speed: 4,
    color: "#6b3f1d"
};

const camera = {
    x: 0,
    y: 0
};

const keys = {};

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

function updatePlayer(){

    if(keys["z"] || keys["w"] || keys["arrowup"])
        player.y -= player.speed;

    if(keys["s"] || keys["arrowdown"])
        player.y += player.speed;

    if(keys["q"] || keys["a"] || keys["arrowleft"])
        player.x -= player.speed;

    if(keys["d"] || keys["arrowright"])
        player.x += player.speed;

    player.x = Math.max(0, Math.min(world.width, player.x));
    player.y = Math.max(0, Math.min(world.height, player.y));

    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
}
// ======================================================
// Rendu du monde
// ======================================================

const cactus = [];

for (let i = 0; i < 120; i++) {
    cactus.push({
        x: Math.random() * world.width,
        y: Math.random() * world.height
    });
}

const rocks = [];

for (let i = 0; i < 80; i++) {
    rocks.push({
        x: Math.random() * world.width,
        y: Math.random() * world.height,
        size: 20 + Math.random() * 25
    });
}

function drawGround() {

    ctx.fillStyle = "#d8c07b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#cfb36b";
    ctx.lineWidth = 1;

    const grid = 64;

    for (let x = -camera.x % grid; x < canvas.width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = -camera.y % grid; y < canvas.height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

}

function drawDecor() {

    ctx.fillStyle = "#2f8f4e";

    cactus.forEach(c => {

        const x = c.x - camera.x;
        const y = c.y - camera.y;

        ctx.fillRect(x - 4, y - 18, 8, 36);
        ctx.fillRect(x - 10, y - 8, 6, 14);
        ctx.fillRect(x + 4, y - 8, 6, 14);

    });

    ctx.fillStyle = "#777";

    rocks.forEach(r => {

        const x = r.x - camera.x;
        const y = r.y - camera.y;

        ctx.beginPath();
        ctx.arc(x, y, r.size, 0, Math.PI * 2);
        ctx.fill();

    });

}

function drawPlayer() {

    const x = player.x - camera.x;
    const y = player.y - camera.y;

    ctx.fillStyle = player.color;

    ctx.fillRect(
        x - player.width / 2,
        y - player.height / 2,
        player.width,
        player.height
    );

    ctx.fillStyle = "#3b2412";

    ctx.fillRect(
        x - 18,
        y - 20,
        36,
        6
    );

}
