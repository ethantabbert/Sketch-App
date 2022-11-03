var canvas = document.getElementById("OMPCanvas");
var drawContext = canvas.getContext("2d");
var textContext = canvas.getContext("2d");
var textButton = document.getElementById("modeButton");

var radius = 4;
var start = 0;
var end = Math.PI * 2;
var dragging = false;

var toggleBool = true;

var textEntry = "";
var textX = 0;
var textY = 0;

canvas.width = window.innerWidth - 21;
canvas.height = window.innerHeight * .8;

textButton.addEventListener('click', function onClick() {
    if (toggleBool) {
        textButton.style.backgroundColor = "#0a682f";
        textButton.style.color = "white";
        textButton.textContent = "Text Mode";
        toggleBool = false;
        textMode();
    } else {
        textButton.style.backgroundColor = "#ffc425";
        textButton.style.color = "black";
        textButton.textContent = "Draw Mode";
        toggleBool = true;
        drawingMode();
    }
});

function textMode() {
    canvas.removeEventListener('mousedown', engage);
    canvas.addEventListener('mousedown', type);

    canvas.addEventListener('mouseup', disengage);
}

var type = function(e) {
    getCursorPosition(canvas, e);

    textInput();
    textContext.font = "50px aerial";
    textContext.fillStyle = "white";
    textContext.fillText(textEntry, textX, textY);
}

function drawingMode() {
    canvas.removeEventListener('mousedown', type);
    drawContext.lineWidth = radius * 2;

    canvas.addEventListener('mousedown', engage);
    canvas.addEventListener('mousemove', putPoint);
    canvas.addEventListener('mouseup', disengage);

    if (!toggleBool) {
        return;
    }
}

var putPoint = function(e){
    if(dragging){
        drawContext.lineTo(e.offsetX, e.offsetY);
        drawContext.strokeStyle = "white";
        drawContext.stroke();
        drawContext.beginPath();
        drawContext.arc(e.offsetX, e.offsetY, radius, start, end);
        drawContext.fillStyle = "white";
        drawContext.fill();
        drawContext.beginPath();
        drawContext.moveTo(e.offsetX, e.offsetY);
    }
}

var engage = function(e){
    dragging = true;
    putPoint(e);
}

var disengage = function(e){
    dragging = false;
    drawContext.beginPath();
}


function textInput() {
    textEntry = "";
    if (!toggleBool) {
        let entry = prompt("Enter text:");
        if (entry == undefined || entry == null || entry == "") {
            return;
        } else {
            textEntry = entry;
        }
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    textX = x;
    textY = y;
    return x, y;
}

window.onload = drawingMode();