var canvas = document.getElementById("OMPCanvas");
var context = canvas.getContext("2d");
var button = document.getElementById("modeButton");

var radius = 5;
var start = 0;
var end = Math.PI * 2;
var dragging = false;

var toggleBool = true;

button.addEventListener('click', function onClick() {
    console.log("clicked")
    if (toggleBool) {
        button.style.backgroundColor = "#0a682f";
        button.style.color = "white";
        toggleBool = false;
    } else {
        button.style.backgroundColor = "#ffc425";
        button.style.color = "black";
        toggleBool = true;
    }
});

canvas.width = window.innerWidth - 18;
canvas.height = window.innerHeight * .8;

context.lineWidth = radius * 2;

var putPoint = function(e){
    if(dragging){
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = "white";
        context.stroke();
        context.beginPath();
        context.arc(e.offsetX, e.offsetY, radius, start, end);
        context.fillStyle = "white";
        context.fill();
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
    }
}

var engage = function(e){
    dragging = true;
    putPoint(e);
}

var disengage = function(e){
    dragging = false;
    context.beginPath();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);

