const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 160;
canvas.height = 240;
ctx.imageSmoothingEnabled = false;

const world_width = 160;
const world_height = 6000;

function drawTree() {
    ctx.fillStyle = "#59402c";
    ctx.fillRect(0, 0, world_width, world_height);

    ctx.fillStyle = "#795332";
    ctx.fillRect(0, 0, 12, world_height);
    ctx.fillRect(148, 0, 12, world_height);

    ctx.fillStyle = "#3e3025";
    ctx.fillRect(12, 0, 136, world_height);
}

drawTree();