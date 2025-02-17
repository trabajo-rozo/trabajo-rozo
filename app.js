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
    playerScores = Array(numPlayers).fill(0); 
    playerWords = Array.from({ length: numPlayers }, () => []); 
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

function addWord() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim().toUpperCase();

    if (word && word.startsWith(currentLetter) && !words.has(word)) {
        words.add(word);
        playerWords[currentPlayerIndex].push(word); 
        document.getElementById('wordList').innerHTML += `<div>${word}</div>`;
        playerScores[currentPlayerIndex]++; 
        wordInput.value = '';
    } else {
        alert('Palabra inválida o repetida. Asegúrate de que comience con la letra correcta y no esté repetida.');
    }
}

function endTurn() {
    clearInterval(timer);
    currentPlayerIndex++;
    if (currentPlayerIndex >= players.length) {
        currentPlayerIndex = 0;
        declareWinner();
    } else {
        document.getElementById('currentPlayer').innerText = players[currentPlayerIndex];
        currentLetter = getRandomLetter();
        document.getElementById('currentLetter').innerText = currentLetter;
        document.getElementById('wordList').innerHTML = '';
        words.clear();
        startTimer();
    }
}

function declareWinner() {
    const maxScore = Math.max(...playerScores);
    
    const winnerIndex = playerScores.indexOf(maxScore);
    const winnerPlayer = players[winnerIndex];
    const winnerWords = playerWords[winnerIndex];

    document.getElementById('winner').innerText = `¡El ganador es ${winnerPlayer}!`;
    document.getElementById('gameArea').style.display = 'none';
    showFinalResults(winnerPlayer, winnerWords);
}

function showFinalResults(winnerPlayer, winnerWords) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores
    resultsDiv.innerHTML += `<h4>${winnerPlayer} (Puntaje: ${winnerWords.length})</h4>`;
    resultsDiv.innerHTML += `<p>Palabras: ${winnerWords.join(', ') || 'Ninguna'}</p>`;
    document.getElementById('finalResults').style.display = 'block';
}
