Array.prototype.repeat = function (what, L) {
    while (L) this[--L] = what;
    return this;
};
let SquareEnum = {
    "EMPTY": 0,
    "APPLE": 1,
    "SNAKE": 2
};
let DirectionEnum = {
    "EAST": 0,
    "SOUTH": 1,
    "NORTH": 2,
    "WEST": 3
};
Object.freeze(SquareEnum);
Object.freeze(DirectionEnum);

class Square {
    constructor(value) {
        this.value = value;
    }

    toString() {
        return this.value;
    };
}

class SnakeGame {


    constructor(height = 10, width = 10) {
        this.height = height;
        this.width = width;
        this.grid = new Array(height);
        for (let i = 0; i < width; i++) {
            this.grid[i] = [].repeat(new Square(SquareEnum["EMPTY"]), width);
        }
        this.snakeDirection = DirectionEnum["EAST"];
        this.createSnake();
    }

    createSnake() {

    }

    snakify(x, y) {
        this.grid[x][y] = SquareEnum["SNAKE"]
    }
    applify(x, y) {
        this.grid[x][y] = SquareEnum["APPLE"]
    }
    emptify(x, y) {
        this.grid[x][y] = SquareEnum["EMPTY"]
    }

}


let game = new SnakeGame(5, 5);
console.table(game.grid);