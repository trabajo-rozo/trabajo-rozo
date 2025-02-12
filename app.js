let jugadores = 0;
let jugadorActual =0;
let palabras = {};
let tiempo = 0;

function startGame(playerCount){
    jugadores = playerCount;
    jugadorActual = 1;
    palabras = {};
    
    for(let i = 1; i <= jugadores; i++)   palabras[1] = [];
    document.getElementById("seccion-jugador");
    document.getElementById("area-juego");
    startTurn();
}
