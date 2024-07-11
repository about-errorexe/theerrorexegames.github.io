// DOM-Elemente abrufen
const startButton = document.getElementById('startButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const gameContainer = document.getElementById('gameContainer');
const footer = document.getElementById('footer');

// Spielvariablen
let score = 0;
let gameSpeed = 2000;  // Geschwindigkeit der Projektil-Würfe in Millisekunden
let projectiles = [];  // Array zum Speichern der aktiven Projektile
let gameStarted = false;

// Event Listener für den Start-Button hinzufügen
startButton.addEventListener('click', startGame);

// Funktion, um das Spiel zu starten
function startGame() {
    startButton.classList.add('hidden'); // Start-Button ausblenden
    backgroundMusic.play(); // Hintergrundmusik abspielen
    gameStarted = true; // Spiel gestartet markieren

    // Spielanleitung anzeigen
    footer.innerText = '2024 TheErrorExe Games - Click anywhere to dodge';

    // Spiel-Loop starten
    setInterval(() => {
        if (gameStarted) {
            throwProjectile(); // Projektile werfen
        }
    }, gameSpeed);
}

// Funktion, um ein Projektil zu werfen
function throwProjectile() {
    const projectile = createProjectile(); // Projektil erstellen
    gameContainer.appendChild(projectile); // Projektil dem Spielcontainer hinzufügen
    moveProjectile(projectile); // Projektil bewegen
}

// Funktion, um ein neues Projektil zu erstellen
function createProjectile() {
    const types = ['xbox', 'pc']; // Arten von Projektilen (Bilder)
    const randomType = types[Math.floor(Math.random() * types.length)]; // Zufällige Auswahl eines Typs
    const projectile = document.createElement('img'); // Neues Bild-Element erstellen
    projectile.src = `${randomType}.png`; // Bildquelle setzen
    projectile.classList.add('projectile'); // Klasse hinzufügen
    projectile.style.top = '0'; // Anfangsposition oben setzen
    projectile.style.left = `${Math.random() * (gameContainer.offsetWidth - 100)}px`; // Zufällige horizontale Position
    return projectile;
}

// Funktion, um ein Projektil zu bewegen
function moveProjectile(projectile) {
    const speed = 5 + score / 5; // Geschwindigkeit erhöht sich mit dem Score
    let posY = 0; // Anfangsposition oben
    const interval = setInterval(() => {
        if (!gameStarted) {
            clearInterval(interval); // Intervall stoppen, wenn das Spiel nicht mehr läuft
            return;
        }

        posY += speed; // Geschwindigkeit erhöhen
        projectile.style.top = `${posY}px`; // Position aktualisieren

        if (posY > gameContainer.offsetHeight) { // Wenn das Projektil den Boden erreicht
            gameContainer.removeChild(projectile); // Projektil aus dem Spielcontainer entfernen
            projectiles = projectiles.filter(p => p !== projectile); // Projektil aus dem Array entfernen
            clearInterval(interval); // Intervall stoppen
        } else {
            checkCollision(projectile); // Kollision überprüfen
        }
    }, 20); // Intervallzeit in Millisekunden
}

// Funktion, um Kollisionen zu überprüfen
function checkCollision(projectile) {
    const you = document.getElementById('you'); // Spieler-Element abrufen
    const youRect = you.getBoundingClientRect(); // Spieler-Rechteck abrufen
    const projectileRect = projectile.getBoundingClientRect(); // Projektil-Rechteck abrufen

    if (
        projectileRect.left < youRect.right &&
        projectileRect.right > youRect.left &&
        projectileRect.top < youRect.bottom &&
        projectileRect.bottom > youRect.top
    ) {
        endGame(); // Spiel beenden, wenn Kollision festgestellt wird
    }
}

// Event Listener für Klicks auf den Bildschirm hinzufügen (Ausweichen)
document.addEventListener('click', dodge);

// Funktion, um auszuweichen
function dodge() {
    if (!gameStarted) return; // Rückkehr, wenn das Spiel nicht gestartet ist

    // Ausführung für jedes aktive Projektil im Array
    projectiles.forEach(projectile => {
        checkCollision(projectile); // Kollision überprüfen
    });
}

// Funktion, um das Spiel zu beenden
function endGame() {
    gameStarted = false; // Spiel gestoppt markieren
    projectiles.forEach(projectile => gameContainer.removeChild(projectile)); // Alle Projektile entfernen
    projectiles = []; // Projektile-Array leeren

    // Spielanleitung aktualisieren und Spiel-Ende anzeigen
    footer.innerText = `You Lost! Score: ${score}`;
    setTimeout(() => {
        window.location.reload(); // Seite neu laden nach kurzer Verzögerung
    }, 2000); // 2 Sekunden Verzögerung
}
