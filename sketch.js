let programRunning = true;

let simulationSize;
let deathrate;
let circleSize;
let movementType;
let collisionType;

let healthyPeople;
let sickPeople;
let curedPeople;
let deadPeople;

let sim;

let addDataGraphTimer;

function setup() {
    updateTextValueFromSlider();

    var canvas = createCanvas(getSketchWidth(), 440);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    startProgram();

    addDataGraphTimer = new Timer(1000);
}

function draw() {
    // normal code
    if (programRunning) {
        background(52, 58, 64);
        sim.move();
        if (collisionType == "optionOthersCollision") { sim.simpleCollision(); }
        if (collisionType == "optionOurCollision") { sim.advancedCollision(); }
        // sim.highlightMouseCell();
        sim.display();

        countInformation();
        updateStatistics();

    } else {
        background(200, 20, 20);
        getUserInput();
        let squareGridWidth = sqrt((height * width) / simulationSize);
        let rows = floor(height / squareGridWidth);
        let cols = floor(width / squareGridWidth);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                stroke(40, 40, 60);
                strokeWeight(circleSize);
                point(j * squareGridWidth + squareGridWidth / 2, i * squareGridWidth + squareGridWidth / 2);
            }
        }
    }
}

function countInformation() {
    healthyPeople = 0;
    sickPeople = 0;
    curedPeople = 0;
    deadPeople = 0;
    for (let person of sim.listOfPersons) {
        if (person.alive && !person.infected) { healthyPeople++; }
        else if (person.alive && person.infected) { sickPeople++; }
        else if (person.alive && person.cured) { curedPeople++; }
        else if (!person.alive) { deadPeople++; }
        else { print("Det er sket en ukendt fejl og du burde kontakte PET for hjælp."); }
    }

    if (addDataGraphTimer.timerRunOut()) {
        updateGraph();
        addDataGraphTimer.start();

    }
}

function updateStatistics() {
    let healthyPeopleText = document.getElementById("healthyPeopleText");
    let sickPeopleText = document.getElementById("sickPeopleText");
    let curedPeopleText = document.getElementById("curedPeopleText");
    let deadPeopleText = document.getElementById("deadPeopleText");
    healthyPeopleText.innerHTML = healthyPeople;
    sickPeopleText.innerHTML = sickPeople;
    curedPeopleText.innerHTML = curedPeople;
    deadPeopleText.innerHTML = deadPeople;

}

function windowResized() {
    resizeCanvas(getSketchWidth(), 440);
}

function getSketchWidth() {
    let myWindowWidth = document.getElementById("sketch-width").clientWidth;
    print("Width of canvas should be : " + myWindowWidth);
    return myWindowWidth;
}

class Timer {
    constructor(seconds) {
        this.maxTime = seconds;
        this.start();
    }

    start() {
        this.startTime = millis();
    }

    timerRunOut() {
        return (millis() > this.startTime+this.maxTime);
    }
}