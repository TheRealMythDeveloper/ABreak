

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



//get list of all hidden text
const thoughts = document.querySelectorAll(".BeforeScroll");

//text revealer
function checkforscroll() {
    thoughts.forEach(thought => {
        const position = thought.getBoundingClientRect();

        if (position.top < window.innerHeight * 0.8) {
            thought.classList.add("AfterScroll");

         }     

    });

}

window.addEventListener("scroll", checkforscroll);

checkforscroll(); 