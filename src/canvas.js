const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let interval;

let ArrowEnum = {
    "RIGHT": 0,
    "DOWN": 1,
    "LEFT": 2,
    "UP": 3
};
Object.freeze(ArrowEnum);

const y = c => Math.round(c * canvas.width / game.height);
const x = r => Math.round(r * canvas.height / game.width);

const draw = () => {
    // clear
    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
    ctx.fillStyle = 'rgb(0,200,50)';
    game.snake.map(p => ctx.fillRect(y(p.y)+1, x(p.x)+1, y(1)-1, x(1)-1));

    // draw apples
    ctx.fillStyle = 'rgb(255,50,0)';
    ctx.fillRect(x(game.apple.y)+3, y(game.apple.x)+3, y(1)-3, x(1)-3);

    // add crash
    if (game.gameOver) {
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

};


function stepAndAnimate() {
    game.step();
    draw();
    //console.table(game.getNumberGrid());
}

function animateCanvas() {
    interval = setInterval(stepAndAnimate, game.speed);
}

function stopAnimate() {
    clearInterval(interval);
    interval = false;
}

function calculateTurnDirection(currentDirection, arrowDirection) {
    let curr = currentDirection;
    let arrow = ArrowEnum[arrowDirection];

    if (curr % 2 === arrow % 2){
        //same direction or opposite direction
        return null;
    }
    //special cases
    if (curr === DirectionEnum["NORTH"] && arrow === ArrowEnum["RIGHT"] ){
        return "RIGHT"
    }
    if (curr === DirectionEnum["EAST"] && arrow === ArrowEnum["UP"]){
        return "LEFT"
    }
    if (curr > arrow){
        return "LEFT"
    } else {
        return "RIGHT"
    }
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w': case 'ArrowUp':    game.nextTurnDirection = calculateTurnDirection(game.snakeDirection,"UP"); break;
        case 'a': case 'ArrowLeft':  game.nextTurnDirection = calculateTurnDirection(game.snakeDirection,"LEFT");  break;
        case 's': case 'ArrowDown':  game.nextTurnDirection = calculateTurnDirection(game.snakeDirection,"DOWN"); break;
        case 'd': case 'ArrowRight': game.nextTurnDirection = calculateTurnDirection(game.snakeDirection,"RIGHT");  break;
    }
});

