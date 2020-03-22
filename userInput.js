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
    getUserInput();
    sim = new Simulation();
    programRunning = true;

    print(`Programmet er startet. Følgende indstillinger er blevet indlæst: \nsimSize: ${simulationSize} \ndeathrate: ${deathrate} \nmoveType: ${movementType} \ncolType: ${collisionType}`)
}

function stopProgram() {
    programRunning = false;

    print("Programmet er stoppet.")
}

function getUserInput() {
    // sliders
    let peopleSlider = document.getElementById("peopleRange");
    let deathrateSlider = document.getElementById("deathrateRange");
    let movementTypeInput = $('input[name=optionsMovement]:radio:checked').select()[0].id;
    let collisionTypeInput = $('input[name=optionsCollisionType]:radio:checked').select()[0].id;

    simulationSize = peopleSlider.value;
    deathrate = deathrateSlider.value/100;
    movementType = movementTypeInput;
    collisionType = collisionTypeInput;
}