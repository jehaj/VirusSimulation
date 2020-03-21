let programRunning = true;

let simulationSize;
let deathrate;
let movementType;

let sim;

function setup() {
    updateTextValueFromSlider();

    var canvas = createCanvas(getSketchWidth(), 440);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');
    
    startProgram();
}

function draw() {
    // normal code
    if (programRunning) {
        background(52, 58, 64);
        sim.move();
        sim.display();
    } else {
        background(200, 20, 20);
    }
}

function windowResized() {
    resizeCanvas(getSketchWidth(), 440);
}

function getSketchWidth() {
    let myWindowWidth = document.getElementById("sketch-width").clientWidth;
    print("Width of canvas should be : " + myWindowWidth);
    return myWindowWidth;
}