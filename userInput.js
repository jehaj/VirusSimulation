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

    print(`Programmet er startet. Følgende indstillinger er blevet indlæst: \nsimSize: ${simulationSize} \ndeathrate: ${deathrate} \nmovType: ${movementType}`)
}

function stopProgram() {
    programRunning = false;

    print("Programmet er stoppet.")
}

function getUserInput() {
    // sliders
    let peopleSlider = document.getElementById("peopleRange");
    let deathrateSlider = document.getElementById("deathrateRange");
    let movementTypeInput = $('input:radio:checked').select()[0].id;

    simulationSize = peopleSlider.value;
    deathrate = deathrateSlider.value/100;
    movementType = movementTypeInput;
}