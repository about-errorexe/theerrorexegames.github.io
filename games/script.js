document.getElementById('startButton').addEventListener('click', startGame);

let gameContainer;
let you;
let currentProjectile = null;
let projectileIndex = 0;
let gameInterval;

function startGame() {
    document.getElementById('startButton').classList.add('hidden');
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
    
    const message = document.createElement('p');
    message.innerText = 'Bill Gates want to fight';
    document.body.appendChild(message);

    gameContainer = document.createElement('div');
    gameContainer.id = 'gameContainer';
    document.body.appendChild(gameContainer);

    const billGates = document.createElement('img');
    billGates.src = 'billgates.png';
    billGates.id = 'billGates';
    billGates.style.top = '10px';
    billGates.style.right = '10px';
    gameContainer.appendChild(billGates);

    you = document.createElement('img');
    you.src = 'you.png';
    you.id = 'you';
    you.style.bottom = '10px';
    you.style.left = '10px';
    gameContainer.appendChild(you);

    document.body.addEventListener('click', dodge);

    gameInterval = setInterval(throwProjectile, 2000);
}

function throwProjectile() {
    if (currentProjectile) {
        alert('Game Over');
        window.location.href = 'about:blank';
        return;
    }

    currentProjectile = document.createElement('img');
    currentProjectile.classList.add('projectile');
    currentProjectile.src = projectileIndex < 4 ? 'xbox.png' : 'pc.png';
    currentProjectile.style.top = '50px';
    currentProjectile.style.right = '100px';
    gameContainer.appendChild(currentProjectile);
    moveProjectile(currentProjectile);

    projectileIndex++;
    if (projectileIndex >= 9) {
        clearInterval(gameInterval);
        setTimeout(() => {
            alert('You won!');
            location.reload();
        }, 500);
    }
}

function moveProjectile(projectile) {
    let posY = parseInt(projectile.style.top);
    const interval = setInterval(() => {
        if (posY >= gameContainer.offsetHeight - you.offsetHeight - 10) {
            clearInterval(interval);
            checkCollision(projectile);
        } else {
            posY += 10;
            projectile.style.top = `${posY}px`;
        }
    }, 100);
}

function dodge() {
    if (currentProjectile) {
        gameContainer.removeChild(currentProjectile);
        currentProjectile = null;
    }
}

function checkCollision(projectile) {
    const youRect = you.getBoundingClientRect();
    const projRect = projectile.getBoundingClientRect();
    
    if (
        projRect.left < youRect.right &&
        projRect.right > youRect.left &&
        projRect.top < youRect.bottom &&
        projRect.bottom > youRect.top
    ) {
        alert('Game Over');
        window.location.href = 'about:blank';
    }
}
