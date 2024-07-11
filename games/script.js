// DOM-Elemente abrufen
const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');
const footer = document.getElementById('footer');
const backgroundMusic = document.getElementById('backgroundMusic');

// Spielvariablen
let score = 0;
let gameSpeed = 2000;  // Geschwindigkeit der Projektil-Würfe in Millisekunden
let projectiles = [];  // Array zum Speichern der aktiven Projektile
let gameStarted = false;

// Spieler-Element erstellen und anzeigen
const you = document.createElement('img');
you.id = 'you';
you.src = 'you.png';
you.classList.add('player');
gameContainer.appendChild(you);

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
    projectiles.push(projectile); // Projektil zum Array hinzufügen
    moveProjectile(projectile); // Projektil bewegen
}

// Funktion, um ein neues Projektil zu erstellen
function createProjectile() {
    const types = ['xbox', 'pc']; // Arten von Projektilen (Bilder)
    const randomType = types[Math.floor(Math.random() * types.length)]; // Zufällige Auswahl eines Typs
    const projectile = document.createElement('img'); // Neues Bild-Element erstellen
    projectile.src = `${randomType}.png`; // Bildquelle setzen
    projectile.classList.add('projectile'); // Klasse hinzufügen
    projectile.style.top = '-50px'; // Anfangsposition
