class Simulation {
    constructor() {
        this.listOfPersons = [];
        for (let i = 0; i < simulationSize; i++) {
            this.listOfPersons.push(new Person());
        }
        print("Har lavet en sim med " + simulationSize + " personer");
    }

    move() {
        for (let person of this.listOfPersons) {
            person.move();
        }
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
        this.speed = random(0.5, 1);

        Person.diameter = 5;

        this.alive = true;
        this.infected = false;
        this.cured = false;
        this.isDoctor = false;

        if (movementType == "optionNoise") {
            // flere variabler skal laves
            this.time = random(0, 10000);
            this.advancement = random(0.002, 0.1);
        } else if (movementType == "optionRandom") {
            this.speed += 0.5;
        }
    }

    move() {
        if (movementType == "optionNoise") {
            this.x += map(noise(this.time), 0, 0.95, -this.speed, this.speed);
            this.y += map(noise(this.time + 1000), 0, 0.95, -this.speed, this.speed);
            this.time += this.advancement;
        } else if (movementType == "optionRandom") {
            this.x += random(-this.speed, this.speed);
            this.y += random(-this.speed, this.speed);
        } else if (movementType == "optionCollision") {

        }

        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    display() {
        strokeWeight(Person.diameter);
        stroke(255);
        point(this.x, this.y);
    }

    isColliding(otherPerson) {
        let calculatedDistance = dist(this.x, this.y, otherPerson.x, otherPerson.y);
        let distanceSmallEnough = calculatedDistance < (this.diameter/2 + otherPerson.diameter/2);
        return distanceSmallEnough;
    }

    infect() {

    }

    die() {

    }
}