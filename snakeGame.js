const canvas = document.getElementById('gameCanvas'); // Get the canvas element
canvas.style.display = 'block'; // Ensure the canvas is visible
document.getElementById('start-button').addEventListener('click', startGame); // Add click event to start the game

const ctx = canvas.getContext('2d');

const box = 20; // Size of the snake and food
let direction = 'RIGHT'; // Initial direction
let score = 0;
let snake; // Declare snake variable without initialization
let food; // Declare food variable without initialization
let game; // Declare game variable globally

// Control the snake direction
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode == 65 && direction != 'RIGHT') { // A key for left
        direction = 'LEFT';
    } else if (event.keyCode == 87 && direction != 'DOWN') { // W key for up
        direction = 'UP';
    } else if (event.keyCode == 68 && direction != 'LEFT') { // D key for right
        direction = 'RIGHT';
    } else if (event.keyCode == 83 && direction != 'UP') { // S key for down
        direction = 'DOWN';
    }
}

// Draw everything on the canvas
function draw() {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white'; // Head is green, body is white
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake in the direction
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    // If the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        generateFood(); // Generate new food position
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {

        clearInterval(game); // Stop the game loop
        // Hide the game canvas
        document.getElementById('gameCanvas').style.display = 'none';
        // Show the title screen
        document.getElementById('game-title').style.display = 'block';
        document.getElementById('start-button').style.display = 'block';
    }

    snake.unshift(newHead); // Add new head to the snake
}

// Check for collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function generateFood() {
    let newFoodPosition;
    let occupied = true;
    let attempts = 0; // Limit attempts to find a valid position

    while (occupied && attempts < 100) { // Limit attempts to avoid infinite loop
        newFoodPosition = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };

        // Check if the new food position is occupied by the snake
        occupied = snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y);
        attempts++;
    }

    food = newFoodPosition; // Set the new food position
}

function startGame() {
    // Reset game state
    direction = 'RIGHT';
    score = 0;
    snake = [{ x: 4 * box, y: 4 * box }]; // Initialize snake position
    generateFood(); // Generate initial food position
    alert('Get ready! The game will start in 2 seconds.'); // Alert user before starting
    document.getElementById('gameCanvas').style.display = 'block'; // Show the game canvas

    // Hide title and button
    document.getElementById('game-title').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';

    game = setInterval(draw, 300); // Start the game with a slower speed

    setTimeout(() => {
        clearInterval(game);
        game = setInterval(draw, 150); // Start the game with reduced speed
    }, 2000); // Timer duration
}

