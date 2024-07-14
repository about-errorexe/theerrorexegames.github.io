const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreBoard = document.getElementById('score');
const controlType = document.getElementById('controlType');
let score = 0;
let gameInterval;
let obstacleInterval;
let coinInterval;

// Function to move player up and down using keyboard
document.addEventListener('keydown', (e) => {
    if (controlType.value === 'keyboard') {
        const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        if (e.key === 'ArrowUp' && playerTop > 0) {
            player.style.top = playerTop - 50 + 'px';
        } else if (e.key === 'ArrowDown' && playerTop < gameArea.clientHeight - player.clientHeight) {
            player.style.top = playerTop + 50 + 'px';
        }
    }
});

// Variables to handle swipe functionality
let touchStartY = 0;
let touchEndY = 0;

function handleGesture() {
    const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    if (touchEndY < touchStartY && playerTop > 0) {
        // Swipe up
        player.style.top = playerTop - 50 + 'px';
    }
    if (touchEndY > touchStartY && playerTop < gameArea.clientHeight - player.clientHeight) {
        // Swipe down
        player.style.top = playerTop + 50 + 'px';
    }
}

// Event listeners for touch events
gameArea.addEventListener('touchstart', (e) => {
    if (controlType.value === 'swipe') {
        touchStartY = e.changedTouches[0].screenY;
    }
}, false);

gameArea.addEventListener('touchend', (e) => {
    if (controlType.value === 'swipe') {
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }
}, false);

// Function to create obstacles
function createObstacle() {
    const obstacle = document.createElement('img');
    obstacle.src = 'stein.png';
    obstacle.classList.add('obstacle');
    obstacle.style.top = Math.floor(Math.random() * (gameArea.clientHeight - 30)) + 'px';
    obstacle.style.left = gameArea.clientWidth + 'px';
    gameArea.appendChild(obstacle);
}

// Function to create coins
function createCoin() {
    const coin = document.createElement('img');
    coin.src = 'geld.png';
    coin.classList.add('coin');
    coin.style.top = Math.floor(Math.random() * (gameArea.clientHeight - 30)) + 'px';
    coin.style.left = gameArea.clientWidth + 'px';
    gameArea.appendChild(coin);
}

// Function to update positions of obstacles and coins
function updatePositions() {
    const obstacles = document.querySelectorAll('.obstacle');
    const coins = document.querySelectorAll('.coin');
    
    obstacles.forEach(obstacle => {
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        if (obstacleLeft <= 0) {
            obstacle.remove();
        } else {
            obstacle.style.left = obstacleLeft - 5 + 'px';
            
            // Check collision with player
            if (isCollision(player, obstacle)) {
                endGame();
            }
        }
    });

    coins.forEach(coin => {
        let coinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue('left'));
        if (coinLeft <= 0) {
            coin.remove();
        } else {
            coin.style.left = coinLeft - 5 + 'px';
            
            // Check collision with player
            if (isCollision(player, coin)) {
                score += 10;
                scoreBoard.innerText = score;
                coin.remove();
            }
        }
    });
}

// Function to check collision
function isCollision(player, object) {
    const playerRect = player.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();
    return !(
        playerRect.top > objectRect.bottom ||
        playerRect.bottom < objectRect.top ||
        playerRect.left > objectRect.right ||
        playerRect.right < objectRect.left
    );
}

// Function to end game
function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    clearInterval(coinInterval);
    alert(`Game Over! Your score: ${score}`);
    setTimeout(() => {
        location.reload();
    }, 7000);
}

// Start the game
function startGame() {
    gameInterval = setInterval(updatePositions, 20);
    obstacleInterval = setInterval(createObstacle, 2000);
    coinInterval = setInterval(createCoin, 3000);
}

startGame();
