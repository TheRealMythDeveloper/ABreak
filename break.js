

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
    y: groundY - 40,
    width: 48,
    height:40,
    speed: 5,
    velocityY: 0,
    jumpPower: -5,
    gravity: 0.15,
grounded:true
};  

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

ctx.fillRect(0, groundY, world_width, veiw_height - groundY);

  ctx.fillStyle = "#26221c";
  ctx.fillRect(0,groundY, world_width, 5);


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