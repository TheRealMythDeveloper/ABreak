alert("Script loaded");

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 160;
canvas.height = 240;

ctx.fillStyle = "magenta";
ctx.fillRect(0, 0, 160, 240);

ctx.fillStyle = "white";
ctx.fillRect(50, 50, 60, 60);