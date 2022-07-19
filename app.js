
const numeroPregunta = document.querySelector(".numeroPregunta");
const textoPregunta = document.querySelector(".textoPregunta");
const containerOpciones = document.querySelector(".containerOpciones");
const cajaTrivia = document.querySelector(".cajaTrivia");
const cajaTimer = document.querySelector(".timer");
const timeCount = cajaTrivia.querySelector(".timer p span");
const indicadorRespuestasContainer = document.querySelector(".indicadorRespuestas");
const resultadoRespuesta = document.querySelector(".resultadoRespuesta");
const next = document.querySelector(".btn");
const resultBox = document.querySelector(".result-box");


let preguntasDisponibles = [];
let opcionesDisponibles = [];
let contadorPreguntas = 0;
let preguntaActual;
let respuestasCorrectas = 0;
let intentos = 0;
let marcador = 0
let cronometro;
let timeValue = 10;


//PREGUNTAS DISPONIBLES

function definirPreguntasDisponibles(){
    const totalPreguntas = cuestionario.length;
    for(let i=0; i<totalPreguntas; i++){
        preguntasDisponibles.push(cuestionario[i])
    }
}



//TRAER PREGUNTA

function traerPregunta(){
    numeroPregunta.innerHTML = "Pregunta " + (contadorPreguntas + 1) + " de " + cuestionario.length; //contador de preguntas

    const indexPreguntas = preguntasDisponibles[Math.floor(Math.random() * preguntasDisponibles.length)]  //random para las preguntas

    preguntaActual = indexPreguntas;
    textoPregunta.innerHTML = preguntaActual.q;   //texto pregunta actual
    
    const index1 = preguntasDisponibles.indexOf(indexPreguntas);
    preguntasDisponibles.splice(index1,1);  //saco la pregunta actual de preguntas disponibles
    //mostrar imagen si la propiedad foto existe 
    if(preguntaActual.hasOwnProperty("foto")){
        const img = document.createElement("img");
        img.src = preguntaActual.foto;
        textoPregunta.appendChild(img);
    }

    const largoOpciones = preguntaActual.options.length; //cantidad de opciones a elegir
    for(let i=0; i<largoOpciones; i++){
        opcionesDisponibles.push(i)
    }
    containerOpciones.innerHTML = '';


    for(let i=0; i<largoOpciones; i++){
        const optionIndex = opcionesDisponibles[Math.floor(Math.random() * opcionesDisponibles.length)]; //random para las opciones
        const index2 = opcionesDisponibles.indexOf(optionIndex);
        opcionesDisponibles.splice(index2,1);
        
        const option = document.createElement("div");
        option.innerHTML = preguntaActual.options[optionIndex];
        option.id = optionIndex;
        option.className = "option";
        containerOpciones.appendChild(option)
        option.setAttribute("onclick" , "resolver(this)")
    }
    clearInterval(cronometro);
    startTimer(timeValue);
    contadorPreguntas++;
}

function resolver(element){
    clearInterval(cronometro);
    const id = parseInt(element.id);
    if(id === preguntaActual.answer){
        element.classList.add("correcto");
        actualizarIndicadorRespuestas("correcto");
        respuestasCorrectas++;
        marcador++;
        
    }
    else{
        element.classList.add("incorrecto");
        actualizarIndicadorRespuestas("incorrecto");
        const largoOpciones = containerOpciones.children.length;
        for(i=0; i<largoOpciones; i++){
            if(parseInt(containerOpciones.children[i].id) === preguntaActual.answer){
                containerOpciones.children[i].classList.add("correcto");
            }
        }
    }
    intentos++;
    restringido()
}

function restringido(){
    const largoOpciones = containerOpciones.children.length;
    for(let i=0; i<largoOpciones; i++){
        containerOpciones.children[i].classList.add("respondida")
    }
}

function indicadorRespuestas(){
    const preguntasTotales = cuestionario.length;
    for(let i=0; i<preguntasTotales; i++){
        const indicador = document.createElement("div");
        indicadorRespuestasContainer.appendChild(indicador);
    }
}

function actualizarIndicadorRespuestas(markType){
    indicadorRespuestasContainer.children[contadorPreguntas-1].classList.add(markType)
}



function siguiente(){
    resultadoRespuesta.innerHTML = "";
    if(contadorPreguntas === cuestionario.length){
        console.log("trivia finalizada");
        //resultadoRespuesta.innerHTML = "Trivia finalizada. Hiciste " + marcador + " puntos en total.";
        finalizar();
        //if(marcador == cuestionario.length){
        //    resultadoRespuesta.innerHTML = "Puntaje Perfecto! Respondiste todas las preguntas correctamente!";
        //}
        //else{
        //}
    }
    else{
        traerPregunta();
    }
    timeCount.style.background = "white";
}

    ///TEMPORIZADOR

    function startTimer(time){
        cronometro = setInterval(timer, 1000);
        function timer(){
            timeCount.textContent = time;
            time--;
            if(time < 0){
                clearInterval(cronometro);
                timeCount.textContent = "00";
                timeCount.style.background = "red";
                restringido();
                //resultadoRespuesta.innerHTML = "Se acabó el tiempo";
                //resultadoRespuesta.classList.add("incorrecto");
                //resultadoRespuesta.classList.remove("correcto");
                actualizarIndicadorRespuestas("incorrecto");
                //errores++;
            }
            
        }
    }


///////FINALIZAR FALTA!!!!!

function finalizar(){ 
    clearInterval(cronometro);    //Eliminar todos los elementos del box salvo el resultado al finalizar /// CAMBIAR POR ESTADISTICAS Y BOTON PARA REINICIAR
    //cajaTimer.remove();
    //indicadorRespuestasContainer.remove();
    //timeCount.remove();
    //next.remove();
    //textoPregunta.remove();
    //containerOpciones.remove();
    cajaTrivia.classList.add("hidden");
    resultBox.classList.remove("hidden");
    resultadoRespuesta.classList.remove("correcto" , "incorrecto");
    resultadoRespuesta.classList.add("margen"); //le doy mas margen arriba y abajo al resultado ya que queda solo en el box
    resultadoRespuesta.innerHTML = "Trivia finalizada. Hiciste " + marcador + " puntos en total.";
}

/*
function resetTrivia(){
    contadorPreguntas = 0;
    respuestasCorrectas = 0;
    intentos = 0;
    marcador = 0;
}

*/
function reiniciar(){
    window.location.reload();
}



function comenzar(){
    preguntasDisponibles = [];
    opcionesDisponibles = [];
    definirPreguntasDisponibles();
    traerPregunta();
    indicadorRespuestas();
}

const username = document.getElementById("username");
const guardar = document.getElementById("guardar");
const tablaScore = document.querySelector(".tablaScore");
const highScoreList = document.getElementById("highScoreList");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//const MAX_HIGH_SCORES = 10;


username.addEventListener("keyup", () => {
    guardar.disabled = !username.value;
})

guardarPuntaje = e => {
    //console.log("cliqueo guardar");
    e.preventDefault();
    const score = {
        score: marcador,
        name: username.value,
    };
    highScores.push(score);

    highScores.sort((a,b) =>  b.score - a.score);

    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    resultBox.classList.add("hidden");
    tablaScore.classList.remove("hidden");
    highScoreList.innerHTML = 
    highScores.map( score => {
    return `<li class="high-score">${score.name} ---------------------- ${score.score}</li>`;
})
.join("");
}




comenzar();