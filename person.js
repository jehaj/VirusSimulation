class Simulation {
    constructor() {
        this.listOfPersons = [];
        for (let i = 0; i < simulationSize; i++) {
            this.listOfPersons.push(new Person());
        }
        print("Har lavet en sim med " + simulationSize + " personer");
    }

    display() {
        for (let person of this.listOfPersons) {
            person.display();
        }
    }
}

class Person {
    constructor() {
        this.x = random(width);
        this.y = random(height);

        this.alive = true;
        this.infected = false;
        this.cured = false;
        this.isDoctor = false;

        if (movementType == "optionNoise") {
            // flere variabler skal laves
        }
    }

    move() {
        if (movementType == "optionNoise") {

        } else if (movementType == "optionRandom") {

        } else if (movementType == "optionCollision") {

        }
    }

    display() {
        strokeWeight(5);
        stroke(255);
        point(this.x, this.y);
    }

    infect() {

    }

    die() {

    }
}