let players = [];
let currentPlayerIndex = 0;
let currentLetter = '';
let words = new Set();
let timer;
let timeLeft = 60;
let playerScores = [];
let playerWords = []; 

document.getElementById('startButton').onclick = startGame;

function startGame() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    players = Array.from({ length: numPlayers }, (_, i) => `Jugador ${i + 1}`);
    playerScores = Array(numPlayers).fill(0); // Inicializa los puntajes de los jugadores
    playerWords = Array.from({ length: numPlayers }, () => []); // Inicializa las palabras de los jugadores
    currentPlayerIndex = 0;
    words.clear();
    document.getElementById('wordList').innerHTML = '';
    document.getElementById('winner').innerText = '';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('currentPlayer').innerText = players[currentPlayerIndex];
    currentLetter = getRandomLetter();
    document.getElementById('currentLetter').innerText = currentLetter;
    startTimer();
}

function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}
function startTimer() {
    timeLeft = 60;
    document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft} segundos`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft} segundos`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Se acabó el tiempo para ' + players[currentPlayerIndex]);
            endTurn();
        }
    }, 1000);
}
