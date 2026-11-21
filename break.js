

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
let veiw_height = window.innerHeight;
let veiw_width = window.innerWidth;
const world_width = 5000;
const world_height = 250;
let groundY = veiw_height - 55;



function resizeGame() {
    veiw_width = window.innerWidth;
    veiw_height = window.innerHeight;
    groundY = veiw_height - 55;
canvas.width = veiw_width;
canvas.height = veiw_height; 
ctx.imageSmoothingEnabled = false;
}

resizeGame();

const forest = new Image();

forest.src = "thehibiscuspoet-forest-saturated-export.jpg";




const player = {
    x: 20,
    y: groundY - 40,
    width: 24,
    height:40,
    speed: 3,
    velocityY: 0,
    jumpPower: -3,
    gravity: 0.15,
grounded:true
};  

 
let cameraX = 0;
const keys = {};

function updatePlayer() {
    const oldBottom = player.y + player.height;
    //horizontal so A D
    if(keys["a"] || keys["ArrowLeft"]) {
        player.x -= player.speed;
    }
    if (keys["d"] || keys["ArrowRight"]) {
        player.x += player.speed;
    
    }

    player.x = Math.max(0, Math.min(world_width - player.width, player.x));
//jumping
    if ((keys[" "] || keys["w"] || keys["ArrowUp"]) && player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false;

    }
 //gravittty 

 player.velocityY += player.gravity;
 player.y += player.velocityY;
if (player.y + player.height >= groundY) {
    player.y = groundY - player.height;
    player.velocityY = 0;
    player.grounded = true;
}
 }


//keeeeeyss
window.addEventListener("keydown", event => {
    keys[event.key] = true;

});
window.addEventListener("keyup", event => {
keys[event.key] = false;
}
);

//camera

function updateCameratoplayer() {
    cameraX = player.x - veiw_width / 2;
    
    cameraX = Math.max(0, 
        Math.min(cameraX, world_width - veiw_width));
 
}
 


//window.addEventListener("wheel", event => {
  //  event.preventDefault();
//},
//{passive: false});

window.addEventListener("keydown", event => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft","ArrowRight", " "].includes(event.key)) {
    event.preventDefault();
    }
});




 


 
//get list of all hidden text
const thoughts = document.querySelectorAll(".BeforeScroll");

//text revealer
function checkforscroll() {
thoughts.forEach((thought, i) => {

if(player.x > i*400 && player.x <  (i+1) * 400) {
    thought.classList.add("AfterScroll");

} else {
    thought.classList.remove("AfterScroll");
}
});
}
 

//trying a world instead
 function drawWorld() {
if (forest.complete && forest.naturalWidth >0) {
    const forestScale = veiw_height / forest.naturalHeight;
    const forestWidth = forest.naturalWidth * forestScale;

    for (let x = 0; x < world_width; x+= forestWidth) {
    ctx.drawImage(forest, x,0, forestWidth, veiw_height);
}
}


ctx.fillStyle = "#29251f";

ctx.fillRect(0, groundY, world_width, veiw_height - groundY);

  ctx.fillStyle = "#393128";
  ctx.fillRect(0,groundY, world_width, 5);


 }


function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    ctx.save();
    ctx.translate(-cameraX, 0);

    drawWorld();

    ctx.fillStyle = "#46391e";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.restore();
}

function gameLoop() { 
    updatePlayer();
    updateCameratoplayer();
    checkforscroll(); //work.. pls

    drawGame();

    requestAnimationFrame(gameLoop);
}

gameLoop();     