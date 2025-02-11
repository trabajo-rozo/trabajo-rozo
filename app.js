let elementoSegundos = document.getElementById("tiempoPredeterminado");
let elementoAlarma = document.getElementById("Alarma");

function comenzarTiempo(){
    setTimeout(tiempoPredeterminado,1000 * 1)
}

function tiempoCumplido(){
    elementoAlarma.textContent("Se termino el tiempo")
    
}