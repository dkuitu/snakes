class Snake {
    constructor() {
        this.position = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.length = 1;
    }

    move() {
        const head = { x: this.position[0].x + this.direction.x, y: this.position[0].y + this.direction.y };
        this.position.unshift(head);
        if (this.position.length > this.length) {
            this.position.pop();
        }
    }

    changeDirection(newDirection) {
        this.direction = newDirection;
    }

    checkCollision() {
        const head = this.position[0];
        for (let i = 1; i < this.position.length; i++) {
            if (head.x === this.position[i].x && head.y === this.position[i].y) {
                return true;
            }
        }
        return false;
    }
}

class Food {
    constructor() {
        this.position = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    }

    respawn() {
        this.position = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    }
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const snake = new Snake();
const food = new Food();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.move();
    if (snake.checkCollision()) {
        alert('Game Over');
        return;
    }

    if (snake.position[0].x === food.position.x && snake.position[0].y === food.position.y) {
        snake.length++;
        food.respawn();
    }

    ctx.fillStyle = 'green';
    snake.position.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.position.x * 20, food.position.y * 20, 20, 20);

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', event => {
    const direction = { x: 0, y: 0 };
    switch (event.key) {
        case 'ArrowUp':
            direction.y = -1;
            break;
        case 'ArrowDown':
            direction.y = 1;
            break;
        case 'ArrowLeft':
            direction.x = -1;
            break;
        case 'ArrowRight':
            direction.x = 1;
            break;
    }
    snake.changeDirection(direction);
});

gameLoop();
