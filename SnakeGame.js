let defaultHeight = 10;
let defaultWidth = 10;
let defaultSnakeDirection = "EAST";
let defaultSnakeBodyIndexes = [[0, 0], [0, 1], [0, 2]];

let SquareEnum = {
    "EMPTY": 0,
    "APPLE": 1,
    "SNAKE": 2
};
Object.freeze(SquareEnum);
let DirectionEnum = {
    "EAST": 0,
    "SOUTH": 1,
    "WEST": 2,
    "NORTH": 3
};
Object.freeze(DirectionEnum);
let DirectionIndexesEnum = {
    0: {x: 0, y: 1},
    1: {x: 1, y: 0},
    2: {x: 0, y: -1},
    3: {x: -1, y: 0}
};
Object.freeze(DirectionIndexesEnum);

class Square {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    toString() {
        return this.value;
    };
}

class SnakeGame {

    step() {
        let head = this.getSnakeHead();
        let nextX = head.x + DirectionIndexesEnum[this.snakeDirection].x;
        let nextY = head.y + DirectionIndexesEnum[this.snakeDirection].y;
        this.snakify(this.getSquareByIndexes(nextX, nextY));
        this.unsnakify(this.getSnakeTail());
    }

    turnSnakeHead(direction) {
        if (direction === "RIGHT") {
            this.snakeDirection = (this.snakeDirection + 1) % 4;
        } else if (direction === "LEFT") {
            this.snakeDirection = (this.snakeDirection - 1 + 4) % 4;
        }
    }

    constructor(height = defaultHeight, width = defaultWidth) {
        this.height = height;
        this.width = width;
        this.grid = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            this.grid[i] = new Array(this.width);
            for (let j = 0; j < this.width; j++) {
                this.grid[i][j] = new Square(i, j, SquareEnum["EMPTY"]);
            }
        }
        this.snakeDirection = DirectionEnum[defaultSnakeDirection];
        this.createSnake();
    }

    createSnake() {
        this.snake = [];
        defaultSnakeBodyIndexes.forEach(function (point) {
            this.snakify(this.getSquareByIndexes(point[0], point[1]));
        }, this);
    }

    snakify(square) {
        square.value = SquareEnum["SNAKE"];
        this.snake.push(square);
    }

    unsnakify(square) {
        if (this.isSnake(square)) {
            this.emptify(square);
            this.snake.shift();
        }
    }

    applify(square) {
        square.value = SquareEnum["APPLE"]
    }

    emptify(square) {
        square.value = SquareEnum["EMPTY"]
    }

    isSnake(square) {
        return square.value === SquareEnum["SNAKE"];
    }

    getSnakeHead() {
        return this.snake.length > 0 ? this.snake[this.snake.length - 1] : null;
    }

    getSnakeTail() {
        return this.snake.length > 0 ? this.snake[0] : null;
    }

    getSquareByIndexes(x, y) {
        return this.grid[x][y]
    }

    getNumberGrid() {
        return this.grid.map(line => line.map(square => square.value))
    }
}


let game = new SnakeGame(5, 5);
console.table(game.getNumberGrid());
game.step();
console.table(game.getNumberGrid());
