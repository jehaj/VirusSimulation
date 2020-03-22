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
        this.grid = new Grid();
        this.grid.initializeGrid(this.listOfPersons);

        for (let i = 0; i < this.grid.rows.length; i += 2) {
            let row = this.grid.rows[i];
            for (let j = 0; j < row.length; j += 2) {
                let cell = row[j];
                let pointsToCollideAgainst = this.grid.rows[i][j].points.concat(this.grid.getNeighbouringPoints(i, j));

                
                for (let point of cell.points) {
                    for (let otherPoint of pointsToCollideAgainst) {
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

        this.x = constrain(this.x, 0, width - 1);
        this.y = constrain(this.y, 0, height - 1);

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

class Grid {
    // this class makes rows containing cells
    // these cells contains points

    constructor() {
        let divisor = width / Person.diameter;
        this.cellWidth = width / 50;
        this.cellHeight = height / 50;
    }

    initializeGrid(listOfPersons) {
        this.rows = [];
        let amountOfRows = height / this.cellHeight;
        for (let i = 0; i < amountOfRows; i++) {
            let amountOfColumns = ceil(width / this.cellWidth);
            let newRow = [];
            for (let j = 0; j < amountOfColumns; j++) {
                let newCell = new Cell();
                newRow.push(newCell);
            }
            this.rows.push(newRow);
        }

        this.putPointsInCells(listOfPersons);
    }

    putPointsInCells(listOfPoints) {
        for (let point of listOfPoints) {
            let row = floor(point.y / this.cellHeight);
            let col = floor(point.x / this.cellWidth);

            this.rows[row][col].points.push(point);
        }
    }

    getNeighbouringPoints(row, cell) {
        let returnPoints = [];
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row - 1, cell - 1));
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row - 1, cell));
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row - 1, cell + 1));
    
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row, cell - 1));
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row, cell + 1));
    
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row + 1, cell - 1));
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row + 1, cell));
        returnPoints = returnPoints.concat(this.returnPointsFromCell(row + 1, cell + 1));
    
        return returnPoints;
    }
    
    returnPointsFromCell(row, cell) {
        try {
            let pointsInCell = this.rows[row][cell].points;
            return pointsInCell;
        }
        catch (err) {
            return [];
        }
    }
}

class Cell {
    constructor() {
        this.points = [];
    }
}