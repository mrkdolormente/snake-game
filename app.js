const boardBorder = "black";
const boardBackground = "white";
const snakeCol = "lightblue";
const snakeBorder = "darkblue";

let snakeParts = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let score = 0;

let changingDirection = false;

let foodX;
let foodY;

let dx = 10;
let dy = 0;

const snakeBoardEl = document.getElementById("snakeboard");

const snakeBoardCtx = snakeBoardEl.getContext("2d");

const clearBoard = () => {
  snakeBoardCtx.fillStyle = boardBackground;

  snakeBoardCtx.strokeStyle = boardBorder;

  snakeBoardCtx.fillRect(0, 0, snakeBoardEl.width, snakeBoardEl.height);

  snakeBoardCtx.strokeRect(0, 0, snakeBoardEl.width, snakeboard.height);
};

const drawSnake = () => {
  snakeParts.forEach(drawSnakePart);
};

const drawSnakePart = (snakePart) => {
  snakeBoardCtx.fillStyle = snakeCol;

  snakeBoardCtx.strokeStyle = snakeBorder;

  snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);

  snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

const moveSnake = () => {
  const head = { x: snakeParts[0].x + dx, y: snakeParts[0].y + dy };

  snakeParts.unshift(head);

  const hasEatenFood = snakeParts[0].x === foodX && snakeParts[0].y === foodY;

  if (hasEatenFood) {
    score += 10;

    document.getElementById("score").innerHTML = score;

    generateFood();
  } else {
    snakeParts.pop();
  }
};

const changeDirection = (event) => {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
};

const hasGameEnded = () => {
  for (let i = 4; i < snakeParts.length; i++) {
    const hasCollided = snakeParts[i].x === snakeParts[0].x && snakeParts[i].y === snakeParts[0].y;

    if (hasCollided) return true;
  }

  const hitLeftWall = snakeParts[0].x < 0;
  const hitRightWall = snakeParts[0].x > snakeBoardEl.width - 10;
  const hitTopWall = snakeParts[0].y < 0;
  const hitBottomWall = snakeParts[0].y > snakeBoardEl.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
};

const randomFood = (min, max) => Math.round((Math.random() * (max - min) + min) / 10) * 10;

const generateFood = () => {
  foodX = randomFood(0, snakeBoardEl.width - 10);
  foodY = randomFood(0, snakeBoardEl.height - 10);
  snakeParts.forEach((part) => {
    const hasEaten = part.x === foodX && part.y === foodY;

    if (hasEaten) generateFood();
  });
};

const drawFood = () => {
  snakeBoardCtx.fillStyle = "lightgreen";
  snakeBoardCtx.strokeStyle = "darkgreen";
  snakeBoardCtx.fillRect(foodX, foodY, 10, 10);
  snakeBoardCtx.strokeRect(foodX, foodY, 10, 10);
};

const main = () => {
  if (hasGameEnded()) return;

  changingDirection = false;

  setTimeout(() => {
    clearBoard();
    drawFood();
    moveSnake();
    drawSnake();

    main();
  }, 100);
};

(() => {
  main();

  generateFood();

  document.addEventListener("keydown", changeDirection);
})();
