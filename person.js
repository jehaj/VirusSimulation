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

    simpleCollision() {
        for (let i = 0; i < this.listOfPersons.length; i++) {
            let point = this.listOfPersons[i];
            point.hasCheckedCollisionThisTurn = true;

            for (let j = i + 1; j < this.listOfPersons.length; j++) {
                let otherPoint = this.listOfPersons[j];
                // check if you should collide: alive - hasnt collided
                // - not cured - didnt collide last turn
                if (otherPoint.alive && !otherPoint.hasCheckedCollisionThisTurn && 
                    !otherPoint.cured && !point.currentlyCollidingWith.includes(otherPoint)) {
                        // check if colliding
                        if (point.isColliding(otherPoint)) {
                            // make sure you dont collide next frame
                            point.currentlyCollidingWith.push(otherPoint);
                            // now make a choice to infect or cure
                            print("Der er sket en collision");
                        } 
                        // if you are not colliding check if it should be removed from colliding list
                        else if (point.currentlyCollidingWith.includes(otherPoint)) {
                            let index = point.currentlyCollidingWith.indexOf(otherPoint);
                            if (index !== -1) {
                                point.currentlyCollidingWith.splice(index, 1);
                            }
                        }
                    }
            }
        }
    }

    advancedCollision() {

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

        this.hasCheckedCollisionThisTurn = false;
        this.currentlyCollidingWith = [];

        if (movementType == "optionNoise") {
            // flere variabler skal laves
            this.time = random(0, 10000);
            this.advancement = random(0.002, 0.1);
        } else if (movementType == "optionRandom") {
            // hastigheden skal være hurtigere
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

        // has not collided yet
        this.hasCheckedCollisionThisTurn = false;
    }

    display() {
        strokeWeight(Person.diameter);
        stroke(255);
        point(this.x, this.y);
    }

    isColliding(otherPerson) {
        let calculatedDistance = dist(this.x, this.y, otherPerson.x, otherPerson.y);
        let distanceSmallEnough = (calculatedDistance < (Person.diameter / 2 + Person.diameter / 2));
        return distanceSmallEnough;
    }

    infect() {
        this.infected = true;
    }

    cure() {
        this.infected = false;
        this.cured = true;
    }

    die() {
        this.alive = false;
    }
}