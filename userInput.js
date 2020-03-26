function updateTextValueFromSlider() {
    // sliders
    let peopleSlider = document.getElementById("peopleRange");
    let deathrateSlider = document.getElementById("deathrateRange");

    // text
    let peopleSliderText = document.getElementById("peopleSliderText");
    let deathrateSliderText = document.getElementById("deathrateSliderText");

    peopleSliderText.innerHTML = peopleSlider.value;
}

function startProgram() {
    stopProgram();
    getUserInput();
    offsetTimer = millis();
    resetGraph();
    sim = new Simulation();
    programRunning = true;
    Person.diameter = circleSize;

    print(`Programmet er startet. Følgende indstillinger er blevet indlæst: \nsimSize: ${simulationSize} \ndeathrate: ${deathrate} \nmoveType: ${movementType} \ncolType: ${collisionType}`)
}

function stopProgram() {
    programRunning = false;
    countCOLLISION = 0;
    countINFECTIONS = 0;

    print("Programmet er stoppet.")
}

function getUserInput() {
    // sliders
    let peopleSlider = document.getElementById("peopleRange");
    let deathrateSlider = document.getElementById("deathrateRange");
    let infectionrateSlider = document.getElementById("infectionrateRange");
    let sizeSlider = document.getElementById("sizeRange");
    let foolAmount = document.getElementById("foolsRange");
    let movementTypeInput = $('input[name=optionsMovement]:radio:checked').select()[0].id;
    let collisionTypeInput = $('input[name=optionsCollisionType]:radio:checked').select()[0].id;


    simulationSize = int(peopleSlider.value);
    deathrate = deathrateSlider.value/100;
    infectionrate = 100-infectionrateSlider.value;
    circleSize = int(sizeSlider.value);
    amountOfFools = int(foolAmount.value/1000*simulationSize);
    movementType = movementTypeInput;
    collisionType = collisionTypeInput;
}