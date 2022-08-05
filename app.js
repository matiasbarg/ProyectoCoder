
const numeroPregunta = document.querySelector(".numeroPregunta");
const textoPregunta = document.querySelector(".textoPregunta");
const containerOpciones = document.querySelector(".containerOpciones");
const cajaTrivia = document.querySelector(".cajaTrivia");
const cajaInicio = document.querySelector(".cajaInicio");
const cajaTimer = document.querySelector(".timer");
const timeCount = cajaTrivia.querySelector(".timer p span");
const indicadorRespuestasContainer = document.querySelector(".indicadorRespuestas");
const resultadoRespuesta = document.querySelector(".resultadoRespuesta");
const next = document.querySelector(".btn");
const resultBox = document.querySelector(".result-box");
const geoloc = document.querySelector(".cajaGeo")

let preguntasDisponibles = [];
let opcionesDisponibles = [];
let contadorPreguntas = 0;
let preguntaActual;
let respuestasCorrectas = 0;
let intentos = 0;
let marcador = 0
let cronometro;
let timeValue = 10;

///GEOLOCALIZACION Y API OPENWEATHER

if (navigator.geolocation) { //check if geolocation is available
    navigator.geolocation.getCurrentPosition(function(position){
      //console.log(position);
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
      //console.log(latitud , longitud)
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitud+'&lon='+longitud+'&appid=632518e204a1c3f812703e1ee7588b7c&units=metric')
        .then(response => response.json())
        .then(data => {
            var ciudad = data['name'];
            var pais = data['sys']['country'];
            var temperatura = data['main']['temp']
            console.log(data)
            geoloc.innerHTML = "<h3>Ciudad: </h3> <p>" + ciudad + "</p> <h3>  Pais: </h3> <p>" + pais + "</p> <h3>  Temperatura: </h3> <p>" + temperatura + "º </p>";
        })
    })
}

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
    const indexPreguntas = preguntasDisponibles[Math.floor(Math.random() * preguntasDisponibles.length)]  //random para laspreguntas
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
        Toastify({
            text: "Correcto",
            duration: 1500,
            gravity: "top",
            position: "center",
            style:{
                background: "green",
                fontSize: "20px",
                fontWeight: 500,
                fontFamily: "Montserrat",
                color: "White"
            }
        }).showToast();
    }
    else{
        element.classList.add("incorrecto");
        actualizarIndicadorRespuestas("incorrecto");
        const largoOpciones = containerOpciones.children.length;
        for(i=0; i<largoOpciones; i++){
            if(parseInt(containerOpciones.children[i].id) === preguntaActual.answer){
                containerOpciones.children[i].classList.add("correcto");
                Toastify({
                    text: "Incorrecto",
                    duration: 1500,
                    gravity: "top",
                    position: "center",
                    style:{
                        background: "red",
                        fontSize: "20px",
                        fontWeight: 500,
                        fontFamily: "Montserrat",
                        color: "White"
                    }
                }).showToast();
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
    contadorPreguntas === cuestionario.length ? finalizar() : traerPregunta();
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
                actualizarIndicadorRespuestas("incorrecto");
                Toastify({
                    text: "Tiempo agotado",
                    duration: 1500,
                    gravity: "top",
                    position: "center",
                    style:{
                        background: "red",
                        fontWeight: 500,
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                        color: "White"
                    }
                }).showToast();
            }
        }
    }

///////FINALIZAR

function finalizar(){
    clearInterval(cronometro);    //Eliminar todos los elementos del box salvo el resultado al finalizar /// CAMBIAR POR ESTADISTICAS Y BOTON PARA REINICIAR
    cajaTrivia.classList.add("hidden");
    resultBox.classList.remove("hidden");
    geoloc.classList.remove("hidden");
    resultadoRespuesta.classList.remove("correcto" , "incorrecto");
    resultadoRespuesta.classList.add("margen"); //le doy mas margen arriba y abajo al resultado ya que queda solo en el box
    resultadoRespuesta.innerHTML = "Trivia finalizada. Hiciste " + marcador + " puntos en total.";
}

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
username.addEventListener("keyup", () => {
    guardar.disabled = !username.value;
})

guardarPuntaje = e => {
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
    return `<li class="high-score">${score.name} ---------${score.score}</li>`;
})
.join("");
}

function iniciar(){
    cajaInicio.classList.add("hidden");
    geoloc.classList.add("hidden");
    cajaTrivia.classList.remove("hidden");
    comenzar();
}

