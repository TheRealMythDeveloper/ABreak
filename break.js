

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const world_width = 3000;

const veiw_height = 250;
const veiw_width = 160;
canvas.width = veiw_width;
canvas.height = veiw_height;




const player = {
    x: 20,
    y: 210,
    width: 6,
    height:10,
    speed: 1,
    velocityY: 0,
    jumpPower: -2,
    gravity: 0.08,
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
if (player.y + player.height >= 220) {
    player.y = 220 - player.height;
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



//now collisison with these
const platformCollision = platforms.flatMap(platform => {
    const leftWidth = platform.gapStart - 16;
    const rightX = platform.gapStart + platform.gapWidth;
    const rightWidth = 144 - rightX;
return [
    {
        x:16,
        y: platform.y,
        width:leftWidth,
        height: 8, 
    },
    {
        x: rightX,
        y:platform.y,
        width:rightWidth, 
        height: 8
    }
].filter(piece => piece.width > 0);
});


 



//get list of all hidden text
const thoughts = document.querySelectorAll(".BeforeScroll");

//text revealer
function checkforscroll() {
thoughts.forEach((thought, i) => {

if(player.x > i*400) {
    thought.classList.add("AfterScroll");

}
});
}


//trying a world instead
 function drawWorld() {
    ctx.fillStyle = "#b8d2a8";
    ctx.fillRect(0,0,world_width,veiw_height);

    ctx.fillStyle = "#59402c";
    ctx.fillRect(0,220,world_width,30);

    ctx.fillStyle = "#829968";
    ctx.fillRect(0,220,world_width,4);

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