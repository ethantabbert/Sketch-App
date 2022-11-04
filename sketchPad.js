var canvas = document.getElementById("OMPCanvas");
var drawContext = canvas.getContext("2d");
var textContext = canvas.getContext("2d");
var textButton = document.getElementById("modeButton");
var selectedColor = "white";
var radius = 4;
var start = 0;
var end = Math.PI * 2;
var dragging = false;

var isTextMode = false;

var textEntry = "";
var textX = 0;
var textY = 0;

canvas.width = window.innerWidth - 21;
canvas.height = window.innerHeight * .8;

textButton.addEventListener('click', function onClick() {
    setCanvasMode();
});

function setCanvasMode(){
    if (!isTextMode) {
        textButton.style.backgroundColor = "#0a682f";
        textButton.style.color = "white";
        textButton.textContent = "Text Mode";
        isTextMode = true;
        textMode();
    } else {
        textButton.style.backgroundColor = "#ffc425";
        textButton.style.color = "black";
        textButton.textContent = "Draw Mode";
        isTextMode = false;
        drawingMode();
    }
}

function textMode() {
    canvas.removeEventListener('mousedown', engage);
    canvas.addEventListener('mousedown', type);

    canvas.addEventListener('mouseup', disengage);
}

var type = function(e) {
    getCursorPosition(canvas, e);

    textInput();
    textContext.font = "50px aerial";
    textContext.fillStyle = selectedColor;
    textContext.fillText(textEntry, textX, textY);
}

function drawingMode() {
    canvas.removeEventListener('mousedown', type);
    drawContext.lineWidth = radius * 2;

    canvas.addEventListener('mousedown', engage);
    canvas.addEventListener('mousemove', putPoint);
    canvas.addEventListener('mouseup', disengage);

    if (!isTextMode) {
        return;
    }
}

var putPoint = function(e){
    if(dragging){
        drawContext.lineTo(e.offsetX, e.offsetY);
        drawContext.strokeStyle = selectedColor;
        drawContext.stroke();
        drawContext.beginPath();
        drawContext.arc(e.offsetX, e.offsetY, radius, start, end);
        drawContext.fillStyle = selectedColor;
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
    if (isTextMode) {
        let entry = prompt("Enter text:");
        if (entry == undefined || entry == null || entry == "") {
            return;
        } else {
            textEntry = entry;
        }
    }
}

function changeColor(color){
   selectedColor = color;
}

function eraser() {
    isTextMode = true;
    selectedColor = "#434343";

    setCanvasMode();
}

function clearAll(){
    textContext.clearRect(0,0, canvas.width, canvas.height);
    drawContext.clearRect(0,0, canvas.width, canvas.height);
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