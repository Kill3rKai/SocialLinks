// easteregg2.js - Diablo's Snake Game Easter Egg

document.addEventListener("DOMContentLoaded", () => {
    const merchWarning = document.querySelector('.shop-warning');

    if (!merchWarning) return;

    let typed = '';
    document.addEventListener('keydown', (e) => {
        typed += e.key.toLowerCase();
        if (typed.includes('snake')) {
            openSnakeGame();
            typed = ''; // Reset so you can trigger again later
        }

        if (typed.length > 20) typed = typed.slice(-20);
    });

    function openSnakeGame() {
        // Prevent multiple popups
        const features = 'width=800,height=1000,resizable=yes,scrollbars=no,menubar=no,toolbar=no,location=no,status=no';
        const gameWindow = window.open('', 'DiabloSnakeGame', features);

        if (!gameWindow) {
            alert('Popup blocked! Please allow popups for this site to play the snake game.');
            return;
        }

        gameWindow.document.open();
        gameWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🐍 Diablo's Snake Game</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #111;
            color: #eee;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            text-align: center;
        }
        h1 { font-size: 36px; margin-bottom: 10px; }
        p { margin: 10px 0 20px; font-size: 18px; color: #bbb; }
        canvas {
            border: 5px solid #60a5fa;
            background: #000;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
        }
        #score { font-size: 28px; margin: 20px 0; font-weight: bold; color: #a855f7; }
        .buttons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        button {
            padding: 12px 28px;
            font-size: 18px;
            background: purple;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
        }
        button:hover { background: #c084fc; transform: scale(1.05); }
        #game-over {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10;
        }
        #game-over h2 { color: #ff3333; font-size: 48px; }
        #final-score { font-size: 32px; margin: 20px 0; color: #a855f7; }
    </style>
</head>
<body>
    <h1>🐍 Diablo's Snake Game</h1>
    <p>Use <strong>ARROW KEYS</strong> to move • Eat the red food • Grow longer!</p>
    <canvas id="canvas" width="400" height="400"></canvas>
    <div id="score">Score: 0</div>
    <div class="buttons">
        <button id="restart">🔄 Restart</button>
        <button id="close">❌ Close Window</button>
    </div>

    <div id="game-over">
        <h2>GAME OVER</h2>
        <div id="final-score">Score: 0</div>
        <button onclick="startGame()">Play Again</button>
    </div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');
        const finalScoreDisplay = document.getElementById('final-score');
        const gameOverScreen = document.getElementById('game-over');

        const GRID_SIZE = 20;
        const TILE_COUNT = canvas.width / GRID_SIZE;

        let snake, food, dx, dy, score, intervalId;

        function initGame() {
            snake = [{ x: 10, y: 10 }];
            dx = 1;
            dy = 0;
            score = 0;
            scoreDisplay.textContent = 'Score: 0';
            placeFood();
            gameOverScreen.style.display = 'none';
        }

        function placeFood() {
            do {
                food = {
                    x: Math.floor(Math.random() * TILE_COUNT),
                    y: Math.floor(Math.random() * TILE_COUNT)
                };
            } while (snake.some(seg => seg.x === food.x && seg.y === food.y));
        }

        function draw() {
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake (head brighter)
            snake.forEach((seg, i) => {
                ctx.fillStyle = i === 0 ? '#c084fc' : '#a855f7';
                ctx.fillRect(seg.x * GRID_SIZE + 2, seg.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);
            });

            // Draw food
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(food.x * GRID_SIZE + GRID_SIZE/2, food.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/2 - 2, 0, Math.PI * 2);
            ctx.fill();
        }

        function move() {
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };

            // Wall collision
            if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
                endGame();
                return;
            }

            // Self collision
            if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
                endGame();
                return;
            }

            snake.unshift(head);

            // Eat food
            if (head.x === food.x && head.y === food.y) {
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
                placeFood();
            } else {
                snake.pop();
            }

            draw();
        }

        function endGame() {
            clearInterval(intervalId);
            finalScoreDisplay.textContent = 'Score: ' + score;
            gameOverScreen.style.display = 'flex';
        }

        function startGame() {
            initGame();
            draw();
            clearInterval(intervalId);
            intervalId = setInterval(move, 120); // Smooth speed
        }

        // Controls
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
            if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
            if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
            if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
        });

        // Buttons
        document.getElementById('restart').onclick = startGame;
        document.getElementById('close').onclick = () => window.close();

        // Start the game when page loads
        startGame();
    </script>
</body>
</html>
        `);
        gameWindow.document.close();
        gameWindow.focus();
    }
});