
const numeroPregunta = document.querySelector(".numeroPregunta");
const textoPregunta = document.querySelector(".textoPregunta");
const containerOpciones = document.querySelector(".containerOpciones");
const resultadoRespuesta = document.querySelector(".resultadoRespuesta");

//ARRAY CON LAS PREGUNTAS - pregunta, opciones y respuesta

const cuestionario = [
    {
        q:'¿Quien descubrió América?',
        options:['Colón', 'Magallanes', 'Shakespeare', 'Los Vikingos'],
        answer:"Colón"
    },
    {
        q:'¿Cuando se declaró la independencia de Argentina?',
        options:['2001', '1492', '1816', '1994'],
        answer:"1816"
    },
    {
        q:'¿Quien fue el primer presidente de Argentina?',
        options:['San Martin', 'Belgrano', 'Rivadavia', 'Washington'],
        answer:"Rivadavia"
    },
    {
        q:'¿Cual es la montaña mas alta del mundo?',
        options:['Aconcagua', 'Los Andes', 'Uritorco', 'Everest'],
        answer:"Everest"
    },
    {
        q:'¿Cuantos decimales tiene el número Pi π?',
        options:['100', '1000', 'Infinitos', '0'],
        answer:"Infinitos"
    },
    {
        q:'¿Cuantos continentes hay en el mundo?',
        options:['6', '7', '8'],
        answer:"7"
    },
    {
        q:'¿Quién escribió "Romeo y Julieta"?',
        options:['Cervantes', 'Quevedo', 'Shakespeare'],
        answer:"Shakespeare"
    },
]


let preguntasDisponibles = [];
let opcionesDisponibles = [];
let contadorPreguntas = 0;
let preguntaActual;
let marcador = 0


//PREGUNTAS DISPONIBLES

function definirPreguntasDisponibles(){
    const totalPreguntas = cuestionario.length;
    for(let i=0; i<totalPreguntas; i++){
        preguntasDisponibles.push(cuestionario[i])
    }
}

definirPreguntasDisponibles();


//TRAER PREGUNTA

function traerPregunta(){
    numeroPregunta.innerHTML = "Pregunta " + (contadorPreguntas + 1) + " de " + cuestionario.length; //contador de preguntas

    const indexPreguntas = preguntasDisponibles[Math.floor(Math.random() * preguntasDisponibles.length)]  //random para las preguntas

    preguntaActual = indexPreguntas;

    textoPregunta.innerHTML = preguntaActual.q;   //texto pregunta actual
    
    const index1 = preguntasDisponibles.indexOf(indexPreguntas);
    preguntasDisponibles.splice(index1,1);  //saco la pregunta actual de preguntas disponibles

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
        option.className = "option";
        containerOpciones.appendChild(option)
    }
    contadorPreguntas++
}

traerPregunta();   ///genero pregunta y opciones

function responder(){   //Toma valor del input y compara con la respuesta de la pregunta del array
    if(respuesta.value == preguntaActual.answer){
        marcador++
        resultadoRespuesta.innerHTML = "Correcto! Respondiste " +  preguntaActual.answer;
    }
    else{
        //console.log("incorrecto, la respuesta era " , preguntaActual.answer)
        resultadoRespuesta.innerHTML = "Incorrecto! La respuesta era " +  preguntaActual.answer;
    }
    siguiente();
}


    function siguiente(){
        if(contadorPreguntas === cuestionario.length){
            resultadoRespuesta.innerHTML = "Trivia finalizada. Hiciste " + marcador + " puntos en total."
            if(marcador == cuestionario.length){
                resultadoRespuesta.innerHTML = "Puntaje Perfecto! Respondiste todas las preguntas correctamente!"
            }
            else{
            }
        }
        else{
            traerPregunta();
        }
    }