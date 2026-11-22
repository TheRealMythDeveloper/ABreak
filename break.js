

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
let veiw_height = window.innerHeight;
let veiw_width = window.innerWidth;
const world_width = 25000;
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
const playerSprite = new Image();
playerSprite.src = "spritesheet.png";
const frameWidth = 250;
const frameHeight = 125;

let animationFrame = 0;
let animationTimer = 0;
const animationSpeed = 8;




const player = {
    x: 40,
    y: groundY - (frameHeight - 50),
    width: frameWidth - 100,
    height:frameHeight - 50,
    speed: 4,
    velocityY: 0,
    jumpPower: -6,
    gravity: 0.15,
grounded:true
};  

const hole = [
    { start: 1550, end: 1800 },
    { start: 4300, end: 4700 },
    { start: 7200, end: 7550 },
    { start: 9700, end: 10150 },
    { start: 13200, end: 13450 },
    { start: 16100, end: 16700 },
    { start: 18700, end: 19050 },
    { start: 21600, end: 22000 },
    { start: 23900, end: 24150 }
];

const springboard = [
    { x: 1380, width: 85, height: 16, bouncePower: -10 },
    { x: 4000, width: 85, height: 16, bouncePower: -10 },
    { x: 7100, width: 85, height: 16, bouncePower: -11 },
    { x: 9600, width: 85, height: 16, bouncePower: -11 },
    { x: 13050, width: 85, height: 16, bouncePower: -10 },
    { x: 15950, width: 85, height: 16, bouncePower: -14 },
    { x: 18550, width: 85, height: 16, bouncePower: -11 },
    { x: 21450, width: 85, height: 16, bouncePower: -12 },
    { x: 23750, width: 85, height: 16, bouncePower: -11 }
];

const platforms = [
    // lots of scattered platforms now
    { x: 2150, y: groundY - 110, width: 210, height: 20 },
    { x: 2670, y: groundY - 65, width: 280, height: 20 },

    { x: 3200, y: groundY - 140, width: 170, height: 20 },
    { x: 3450, y: groundY - 210, width: 230, height: 20 },
    { x: 4250, y: groundY - 110, width: 300, height: 20 },
    { x: 5350, y: groundY - 70, width: 350, height: 20 },
    { x: 6000, y: groundY - 130, width: 180, height: 20 },
    { x: 6330, y: groundY - 190, width: 160, height: 20 },
    { x: 7600, y: groundY - 100, width: 260, height: 20 },
    { x: 7950, y: groundY - 175, width: 190, height: 20 },
    { x: 8270, y: groundY - 125, width: 320, height: 20 },
    { x: 10900, y: groundY - 190, width: 240, height: 20 },

    { x: 11900, y: groundY - 80, width: 200, height: 20 },
    { x: 12250, y: groundY - 155, width: 320, height: 20 },
    { x: 12750, y: groundY - 95, width: 190, height: 20 },
    { x: 13550, y: groundY - 130, width: 300, height: 20 },
    { x: 13950, y: groundY - 220, width: 180, height: 20 },
    { x: 14300, y: groundY - 150, width: 250, height: 20 },

    { x: 15050, y: groundY - 80, width: 240, height: 20 },
    { x: 17000, y: groundY - 170, width: 280, height: 20 },
    { x: 17450, y: groundY - 100, width: 190, height: 20 },

  
    { x: 19200, y: groundY - 120, width: 220, height: 20 },
    { x: 19550, y: groundY - 240, width: 200, height: 20 },
    { x: 19950, y: groundY - 175, width: 350, height: 20 },
    { x: 20400, y: groundY - 90, width: 260, height: 20 },
    { x: 22200, y: groundY - 140, width: 300, height: 20 },
    { x: 22650, y: groundY - 220, width: 180, height: 20 },
    { x: 23000, y: groundY - 110, width: 350, height: 20 },
    { x: 24250, y: groundY - 160, width: 220, height: 20 },
    { x: 24600, y: groundY - 90, width: 280, height: 20 }
];

function animatePlayer() {
    if (keys["a"] || keys["d"] || keys["ArrowLeft"] || keys["ArrowRight"]){
        animationTimer++;
        if (animationTimer >= animationSpeed) {
            animationTimer = 0;
            animationFrame++;
            if (animationFrame >= 8) {
                animationFrame = 0;
            }
        }
    } else {
        animationFrame= 0;
        animationTimer = 0;
    }
}
const dialogue = [
    "Hey..",
    "How about you take a breather?",
    "Days are getting faster, you know.",
    "Things are getting harder with every step, it seems.",
    "Just.. Step away from it all.",
    "Stay here for a while.",
    "Take a deep breath.",
    "In..",
    "out.",
    "It helps, doesn't it?",
    "I feel I would know.",
    "What have you been dealing with lately?",
    "Something stressful.. something hard.",
    "It's ok to be dealing with these things.",
    "Unfortunately, it's natural.",
    "The world wants our attention desperately.",
    "Wants us to consume its fast, short content.",
    "But here.. You don't have to.",
    "You can breathe here.",
    "It's cozy, isn't it?",
    "At least I hope it is.",
    "That's how I designed it, after all.",
    "A little place to relax.",
    "You can go at your own pace here!",
    "Or.. you can even leave. If you prefer.",
    "But you choose to stay.",
    "Because you enjoy the peace.",
    "I'm glad. :3",
    "...",
    "You know..",
    "In a way, you already know me.",
    "Through me speaking to you, through this little game.",
    "But I don't know you. I can't hear you through a screen after all.",
    "But.. there is one thing I can say, that I know.",
    "You..",
    "matter.",
    "You needed some cheering up.",
    "Here it is.",
    "I'm not going to force pity down your throat.",
    "All I can say is.. I know you have a place here.",
    "You can linger as long as you like.",
    "Just keep going.",
    "Keep looking forwards. If there isn't a light, make one.",
    "Look at me here..",
    "Trying to beat time itself, trying to find a way to get enough hours.",
    "I know I can't give up, even when I'm discouraged.",
    "You should know the same.",
    "And if you don't",
    "I'll tell it to you now.",
    "Keep fighting, keep pushing through whatever you have against you.",
    "You can do some crazy things if you push on.",
    "And to you, for staying this long..",
    "Thank you for giving me a chance to talk with you.",
    "I hope I improved your day.",
    "We're almost at the end..",
    "And you can stay as long as you like.",
    ":3",
    "-Myth of the MOS."
];
 
let cameraX = 0;
const keys = {};

function updatePlayer() {
    const oldBottom = player.y + player.height;

    // Movement
    if (keys["a"] || keys["ArrowLeft"]) {
        player.x -= player.speed;
    }

    if (keys["d"] || keys["ArrowRight"]) {
        player.x += player.speed;
    }

    player.x = Math.max(0, Math.min(world_width - player.width, player.x));


    // Jump
if ((keys[" "] || keys["w"] || keys["ArrowUp"]) && player.grounded) {
    player.velocityY = player.jumpPower;
    player.grounded = false;
}

// Gravity
player.velocityY += player.gravity;
player.y += player.velocityY;

const playerBottom = player.y + player.height;
const playerCenter = player.x + player.width / 2;
let landedOnPlatform = false;


for (const platform of platforms) {
    const touchingPlatform =
        player.x + player.width > platform.x &&
        player.x < platform.x + platform.width;

  if(
        touchingPlatform &&
        oldBottom <= platform.y &&
        playerBottom >= platform.y &&
        player.velocityY > 0
    ) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
        landedOnPlatform = true;
        break;
    }
}
    const overHole = hole.some (h => playerCenter > h.start && playerCenter < h.end);
   
   
    // platform
if (!landedOnPlatform && !overHole && playerBottom >= groundY && player.velocityY >= 0) {
    player.y = groundY - player.height;
    player.velocityY = 0;
    player.grounded = true;
}


for (const spring of springboard) {
    const springTop = groundY - spring.height;

    const touchingSpring =
    player.x + player.width > spring.x &&
        player.x < spring.x + spring.width;
 
    if (touchingSpring && player.grounded && !overHole) {
        player.y = springTop - player.height;
        player.velocityY = spring.bouncePower;
        player.grounded = false;
        
        break;
    }
}

    
    if (player.y > veiw_height + 100) {
        const fallenInto = hole.find(h =>
            playerCenter > h.start && playerCenter < h.end
        );

        player.x = fallenInto ? fallenInto.start - 300: 40;
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.grounded = true;
        
        cameraX = player.x - veiw_width / 2;
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
const storyText = document.getElementById("storyText");
let currentDialouge = -1;
//text revealer

function checkforscroll() {

    const section = Math.floor(player.x/ world_width * dialogue.length);
    document.getElementById("debugInfo").textContent = 
    "Player X:"  + Math.floor(player.x) + "| section:" + section;
const dialogueIndex = Math.min(section, dialogue.length - 1);
if (dialogueIndex !== currentDialouge) {
    currentDialouge = dialogueIndex;
    storyText.textContent = dialogue[dialogueIndex];
}

 
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

ctx.fillStyle = "#161512";
let groundStart = 0;
/*ground
*/

for (const h of hole) {
    ctx.fillRect(
        groundStart,
        groundY, h.start - groundStart, veiw_height - groundY 
    );
    groundStart = h.end;
}

ctx.fillRect(
    groundStart,
    groundY,
    world_width - groundStart,
    veiw_height - groundY
);

ctx.fillStyle = "#13110f";
ctx.fillRect(groundStart, groundY, world_width - groundStart, 5);
// Springboards
for (const spring of springboard) {
    ctx.fillStyle = "#35281a";
    ctx.fillRect(
        spring.x,
        groundY - spring.height,
        spring.width,
        spring.height
    );

    ctx.fillStyle = "#7e673f";
    ctx.fillRect(
        spring.x + 5,
        groundY - spring.height,
        spring.width - 10,
        5
    );
}

// Platforms
for (const platform of platforms) {
    ctx.fillStyle = "#49351f";
    ctx.fillRect(
        platform.x,platform.y,
        platform.width,
        platform.height
    );

    ctx.fillStyle = "#80613a";
    ctx.fillRect( platform.x,platform.y,platform.width,
        5
    );

    ctx.fillStyle = "#302216";
    ctx.fillRect(platform.x + 15, platform.y + 10, 20, 3);
    ctx.fillRect(platform.x + platform.width - 35, platform.y + 10, 20, 3);
}
 }


function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    ctx.save();
    ctx.translate(-cameraX, 0);

    drawWorld();

    if (playerSprite.complete && playerSprite.naturalWidth > 0) {
        const frameX = (animationFrame % 4) * frameWidth;
        const frameY = Math.floor(animationFrame / 4) * frameHeight;
        ctx.drawImage(
playerSprite,
frameX,frameY, frameWidth,frameHeight,player.x,player.y,player.width,player.height
        );
    }
    ctx.restore();
}

function gameLoop() { 
    updatePlayer();
    updateCameratoplayer();
    checkforscroll(); //work.. pls
animatePlayer();
    drawGame();

    requestAnimationFrame(gameLoop);
}

gameLoop();     

const forestMusic = document.getElementById("forestMusic");
const musicToggle = document.getElementById("musicToggle")
;
forestMusic.volume = 0.5;
let musicPlaying = false;

musicToggle.addEventListener("click", () => {
    if (!musicPlaying) {
        forestMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.textContent = "Music: on"
  ;   }).catch(error => {
    musicToggle.textContent = "Music: Error";

    
    });
    } else {
        forestMusic.pause();
        musicPlaying = false;
        musicToggle.textContent = "Music: off";

    }
});