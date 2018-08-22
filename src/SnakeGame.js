let defaultHeight = 10;
let defaultWidth = 10;
let defaultGameSpeed = 600; // in ms
let defaultSnakeDirection = "EAST";
let defaultSnakeBodyIndexes = [[1, 1], [1, 2], [1, 3]];

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
}

class SnakeGame {

    step() {
        if (this.nextTurnDirection) {
            this.turnSnakeHead(this.nextTurnDirection);
            this.nextTurnDirection = null;
        }
        let head = this.getSnakeHead();
        let nextX = head.x + DirectionIndexesEnum[this.snakeDirection].x;
        let nextY = head.y + DirectionIndexesEnum[this.snakeDirection].y;
        let nextSquare = this.getSquareByIndexes(nextX, nextY);
        if ( !nextSquare || this.isSnake(nextSquare)) {
            this.crash();
        } else if (this.isApple(nextSquare)){
            this.eatApple();
        } else {
            this.snakeGoOneStep(nextSquare);
        }
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
        this.speed = defaultGameSpeed;
        this.grid = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            this.grid[i] = new Array(this.width);
            for (let j = 0; j < this.width; j++) {
                this.grid[i][j] = new Square(i, j, SquareEnum["EMPTY"]);
            }
        }
        this.snakeDirection = DirectionEnum[defaultSnakeDirection];
        this.initNewRound();
        this.nextTurnDirection = null;
    }

    createDefaultSnake() {
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
        square.value = SquareEnum["APPLE"];
        this.apple = square;
    }

    eatApple() {
        this.snakify(this.apple);
        this.createRandomApple();
    }

    snakeGoOneStep(square){
        this.snakify(square);
        this.unsnakify(this.getSnakeTail());
    }

    emptify(square) {
        square.value = SquareEnum["EMPTY"]
    }

    isSnake(square) {
        return square.value === SquareEnum["SNAKE"];
    }

    isApple(square) {
        return square.value === SquareEnum["APPLE"];
    }

    indexIsInside(x, y){
        return x >= 0 && x < this.height && y >= 0 && x < this.width
    }

    getSnakeHead() {
        return this.snake.length > 0 ? this.snake[this.snake.length - 1] : null;
    }

    getSnakeTail() {
        return this.snake.length > 0 ? this.snake[0] : null;
    }

    getSquareByIndexes(x, y) {
        if(!this.indexIsInside(x,y)){
            return null;
        }
        return this.grid[x][y]
    }

    crash() {
        console.log("crashed")
    }

    clearBoard() {
        this.grid.forEach(function (line) {
            line.forEach(function (square) {
                square.value = SquareEnum["EMPTY"];
            })
        })
    }

    getNumberGrid() {
        return this.grid.map(line => line.map(square => square.value))
    }

    initNewRound() {
        this.clearBoard();
        this.createDefaultSnake();
        this.createRandomApple();
    }

    createRandomApple() {
        let x = Math.floor(Math.random() * this.height);
        let y = Math.floor(Math.random() * this.width);
        let square = this.getSquareByIndexes(x, y);
        if (this.isSnake(square) || this.isApple(square)) {
            this.createRandomApple();
        } else {
            this.applify(square);
        }
    }
}

