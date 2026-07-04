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
