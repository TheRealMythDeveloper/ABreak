
const platforms = [
    {y:180, gapStart: 82, gapWidth:34},
    { y:260, gapStart:24, gapWidth:36},
    { y:550, gapStart:100, gapWidth:32},
    {y:740, gapStart:48, gapWidth:35},
    {y:940, gapStart:90,gapWidth:38},
    {y:1140, gapStart:18, gapWidth: 35},
    { y:1340, gapStart:75,gapWidth:36},
    {y:1760, gapStart:110, gapWidth:40},
    {y:1980, gapStart:95, gapWidth: 36},
    {y:2200, gapStart: 45, gapWidth: 45}
];

platforms.forEach(platform => {
    const leftEnd = platform.gapStart;
    const rightStart = platform.gapStart + platform.gapWidth;

    ctx.fillStyle = "#a17b4d";
    //left side
    ctx.fillRect(12, platform.y, leftEnd - 12, 0);
    
    //right side
    ctx.fillRect(rightStart, platform.y, 148 - rightStart, 8);

    //top coloirng
    ctx.fillStyle = "#c29a61";
    ctx.fillRect(rightStart, platform.y, 148 - rightStart, 2);
    ctx.fillRect(12, platform.y, leftEnd -12, 2);
});

//now collisison with these
const platformCollision = platforms.flatMap(platform => {
    const leftWidth = platform.gapStart - 12;
    const rightX = platform.gapStart + platform.gapWidth;
    const rightWidth = 148 - rightX;
return [
    {
        x:12,
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

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

//Outside layer
ctx.fillStyle = "#59402c";
ctx.fillRect(0,0,160,2400);

//Bark
ctx.fillStyle = "#795332";
ctx.fillRect(0,0,12,2400);
ctx.fillRect(148,0,12,2400);

//more bark
ctx.fillStyle = "#936b43";
ctx.fillRect(0,0,4,2400); 
ctx.fillRect(161,0,3,2400);
 
//hollow for the inside
ctx.fillStyle = "#3e3025";
ctx.fillRect(12,0,136,2400);

ctx.fillStyle = "#68472f";
ctx.fillRect(12,0,4,2400);
ctx.fillRect(144, 0, 4, 2400);

//TEE it must be an ENT
for (let i = 0; i < 1000; i++) {
    const x = Math.random() *160;
    const y = Math.random() * 2400;

    if (x<12 || x>140) {
        ctx.fillStyle = Math.random() > 0.5
        ? "#a17b4d"
        : "#493522"
        ;
        ctx.fillRect(x ,y , 2, Math.random() * 8 + 2);
    }
}


//get list of all hidden text
const thoughts = document.querySelectorAll(".BeforeScroll");

//text revealer
function checkforscroll() {
    thoughts.forEach(thought => {
        const position = thought.getBoundingClientRect();

        if (position.top < window.innerHeight * 1.8) {
            thought.classList.add("AfterScroll");

         }     

    });

}

window.addEventListener("scroll", checkforscroll);

checkforscroll();  