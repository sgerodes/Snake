let SquareEnum = {
    "EMPTY": 0,
    "APPLE": 1,
    "SNAKE": 2,
};
Object.freeze(SquareEnum);


class SnakeGame {
    height = 0;
    width = 0;
    grid = [[]];
    snakeDirection = null;


    constructor(height = 10, width = 10) {
        this.height = height;
        this.width = width;
    }


}