

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const world_width = 200;
const world_height = 6000;
const veiw_height = 160;
const veiw_width = 300;
canvas.width = veiw_width;
canvas.height = veiw_height;


const platforms = [
 {y: 180, gapStart: 82, gapWidth: 23 },
    {y: 340, gapStart: 24, gapWidth:26 },
    { y: 550, gapStart: 100, gapWidth: 22 },
    { y: 740, gapStart: 48, gapWidth:25 },
    { y: 940, gapStart: 90, gapWidth: 28 },
    { y: 1140, gapStart: 18,gapWidth: 25 },
    { y: 1340, gapStart: 75,gapWidth: 26 },
    { y: 1540, gapStart: 110, gapWidth:30 },
    {y: 1760, gapStart: 35, gapWidth: 30 },
    { y: 1980,gapStart: 95, gapWidth: 26 },
 { y: 2200, gapStart: 45, gapWidth:35 },
     {y: 2450,gapStart: 110, gapWidth: 22 },
    { y: 2680, gapStart: 30,gapWidth: 30 },
    {y: 2920, gapStart: 78, gapWidth: 24 },
    { y: 3180, gapStart: 18, gapWidth: 28 },
   {y: 3450, gapStart: 100, gapWidth: 25 },
    { y: 3720, gapStart: 50, gapWidth:28 },
    { y: 3980,gapStart: 115, gapWidth: 20 },
    { y: 4250, gapStart: 35, gapWidth: 32 },
    { y: 4520, gapStart: 85, gapWidth: 25 },
    { y: 4800, gapStart: 20, gapWidth:30},
    { y: 5100,gapStart: 105, gapWidth: 22 },
    { y: 5400, gapStart: 45, gapWidth: 30 },
    { y: 5700,gapStart: 90,gapWidth:26 }
];

const player = {
    x: 48,
    y: 70,
    width: 6,
    height:10,
    speed: 0.8,
    velocityY: 0,
    jumpPower: -2,
    gravity: 0.08,
grounded:false
};  

 
let cameraY = 0;
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

    player.x = Math.max(16, Math.min(139, player.x))
    //jumping, but not high enough to reach the last tree opening hopefully
    if ((keys[" "] || keys["w"] || keys["ArrowUp"]) && player.grounded) {
        player.velocityY = player.jumpPower;
        player.grounded = false;

    }
 //gravittty 

 player.velocityY += player.gravity;
 player.y += player.velocityY;
player.grounded = false;
 if (player.velocityY >= 0) {
    for (const platform of platformCollision){
        const playerBottom = player.y + player.height;
        const overlapsX = 
        player.x + player.width > platform.x &&
        player.x < platform.x + platform.width;

        const crossesPlatforms = 
        oldBottom <= platform.y &&
        playerBottom >= platform.y;

        if (overlapsX && crossesPlatforms) {
            player.y = platform.y - player.height;

            player.velocityY = 0;
            player.grounded = true;
            break;
        }
    }
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
    cameraY = player.y -120;
    
    cameraY = Math.max(0, 
        Math.min(cameraY, world_height - veiw_height));
 
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

if(player.y > i*250) {
    thought.classList.add("AfterScroll");

}
});
}


//tree isnt big enough..
function drawTree() {
    //Outside layer
ctx.fillStyle = "#59402c";
ctx.fillRect(0,0,world_width,world_height);

//Bark
ctx.fillStyle = "#795332";
ctx.fillRect(0,0,12,world_height);
ctx.fillRect(148,0,12,world_height);
 
//more bark
ctx.fillStyle = "#936b43";
ctx.fillRect(0,0,4,world_height); 
ctx.fillRect(152,0,3,world_height);
 
//hollow for the inside
ctx.fillStyle = "#3e3025";
ctx.fillRect(35, 0, 90, world_height);

ctx.fillStyle = "#68472f";
ctx.fillRect(12,0,4,world_height);
ctx.fillRect(144, 0, 4, world_height);
barkDetails.forEach(detail => {
    ctx.fillStyle = detail.color;
    ctx.fillRect(detail.x, detail.y, 2, detail.height);
});

platforms.forEach(platform => {
    const leftEnd = platform.gapStart;
    const rightStart = platform.gapStart + platform.gapWidth;

    ctx.fillStyle = "#a17b4d";
    //left side
    ctx.fillRect(16, platform.y, leftEnd - 16, 12);
    
    //right side
    ctx.fillRect(rightStart, platform.y, 144 - rightStart, 12);

    //top coloirng
    ctx.fillStyle = "#c29a61";
    ctx.fillRect(16, platform.y, leftEnd -16, 2);
  ctx.fillRect(rightStart, platform.y, 144 - rightStart, 4);
});
}

const barkDetails = [];

//TEE it must be an ENT
for (let i = 0; i < 1000; i++) {
    const x = Math.random() * world_width;
    const y = Math.random() * world_height;

    if (x<12 || x>140) {
        barkDetails.push({
            x: x, 
            y:y,
            color: Math.random() > 0.5 ? "#a17b4d"
        : "#493522" ,
height: Math.random() * 8+2        
        
        });
    }
}

//should repeat all drawings

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    ctx.save();
    ctx.translate(0, -cameraY);

    drawTree();

    ctx.fillStyle = "#e8e4dc";
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