

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

//Outside layer
ctx.fillStyle = "#59402c";
ctx.fillRect(0,0,160,240);

//Bark
ctx.fillStyle = "#795332";
ctx.fillRect(0,0,22,240);
ctx.fillRect(138,0,22,240);

//more bark
ctx.fillStyle = "#936b43";
ctx.fillRect(0,0,22,240); 
ctx.fillRect(146,0,7,240);
 
//hollow for the inside
ctx.fillStyle = "#3e3025";
ctx.fillRect(23,0,115,240);

ctx.fillStyle = "#68472f";
ctx.fillRect(27,0,5,240);
ctx.fillRect(120, 0, 5, 240);

//bark (hopefully)

for (let i = 0; i < 350; i++) {
    const x = Math.random() *160;
    const y = Math.random() * 240;

    if (x<22 || x>138) {
        ctx.fillStyle = Math.random() > 0.5
        ? "#a17b4d"
        : "#493522"
        ;
        ctx.fillRect(x ,y , 2,4);
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