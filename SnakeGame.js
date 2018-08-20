let defaultHeight = 10;
let defaultWidth = 10;
let defaultSnakeDirection = "EAST";
let defaultSnakeBodyIndexes = [[0, 0], [0, 1], [0, 2]];

let SquareEnum = {
    "EMPTY": 0,
    "APPLE": 1,
    "SNAKE": 2
};
let DirectionEnum = {
    "EAST": 0,
    "SOUTH": 1,
    "WEST": 2,
    "NORTH": 3
};
let TurnDirectionEnum = {
    "LEFT": 0,
    "RIGHT": 1
};
let DirectionIndexesEnum = {
    0: {x: 0, y: 1},
    1: {x: 1, y: 0},
    2: {x: 0, y: -1},
    3: {x: -1, y: 0}
};
Object.freeze(DirectionIndexesEnum);
Object.freeze(SquareEnum);
Object.freeze(DirectionEnum);
Object.freeze(TurnDirectionEnum);

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
        this.snakify(nextX, nextY);
        let tail = this.getSnakeTail();
        this.unsnakify(tail.x, tail.y);
    }

    turnSnakeHead(direction) {
        if (direction === TurnDirectionEnum["RIGHT"]) {
            this.snakeDirection = (this.snakeDirection + 1) % 4;
        } else if (direction === TurnDirectionEnum["LEFT"]){
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
            this.snakify(point[0], point[1]);
        }, this);
    }

    snakify(x, y) {
        console.log(x, y);
        this.grid[x][y].value = SquareEnum["SNAKE"];
        this.snake.push(this.grid[x][y]);
    }

    unsnakify(x, y) {
        if (this.isSnake(x, y)) {
            this.emptify(x, y);
            this.snake.shift();
        }
    }

    applify(x, y) {
        this.grid[x][y].value = SquareEnum["APPLE"]
    }

    emptify(x, y) {
        this.grid[x][y].value = SquareEnum["EMPTY"]
    }

    isSnake(x, y) {
        return this.grid[x][y].value === SquareEnum["SNAKE"];
    }

    getSnakeHead() {
        return this.snake[this.snake.length - 1];
    }

    getSnakeTail() {
        return this.snake[0];
    }

    getNumberGrid() {
        return this.grid.map(line => line.map(square => square.value))
    }
}


let game = new SnakeGame(5, 5);
console.table(game.getNumberGrid());
game.step();
console.table(game.getNumberGrid());
game.turnSnakeHead(TurnDirectionEnum["LEFT"]);
game.step();
console.table(game.getNumberGrid());
