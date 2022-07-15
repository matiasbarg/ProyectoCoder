
const numeroPregunta = document.querySelector(".numeroPregunta");
const textoPregunta = document.querySelector(".textoPregunta");
const containerOpciones = document.querySelector(".containerOpciones");
const resultadoRespuesta = document.querySelector(".resultadoRespuesta");
const botonResponder = document.querySelector(".botonResponder")


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
        option.className = "option";
        containerOpciones.appendChild(option)
    }
    contadorPreguntas++
}

traerPregunta();   ///genero pregunta y opciones

let textoInput = document.getElementById("textoInput");

let answer = document.getElementById("answer")
answer.addEventListener("click" , responder);


//Toma valor del input y compara con la respuesta de la pregunta del array
function responder(){   
    if(respuesta.value == preguntaActual.answer){
        marcador++
        resultadoRespuesta.innerHTML = "Correcto! Respondiste " +  preguntaActual.answer;
        resultadoRespuesta.classList.add("correcto");
        resultadoRespuesta.classList.remove("incorrecto");
    }
    else{
        resultadoRespuesta.innerHTML = "Incorrecto! La respuesta era " +  preguntaActual.answer;
        resultadoRespuesta.classList.add("incorrecto");
        resultadoRespuesta.classList.remove("correcto");
    }
    siguiente();
}


    function siguiente(){
        if(contadorPreguntas === cuestionario.length){
            resultadoRespuesta.innerHTML = "Trivia finalizada. Hiciste " + marcador + " puntos en total.";
            finalizar();
            if(marcador == cuestionario.length){
                resultadoRespuesta.innerHTML = "Puntaje Perfecto! Respondiste todas las preguntas correctamente!";
            }
            else{
            }
        }
        else{
            traerPregunta();
        }
    }

    //Eliminar todos los elementos del box salvo el resultado al fnalizar

    function finalizar(){
        botonResponder.remove();
        respuesta.remove();
        textoPregunta.remove();
        containerOpciones.remove();
        resultadoRespuesta.classList.remove("correcto" , "incorrecto");
        resultadoRespuesta.classList.add("margen"); //le doy mas margen arriba y abajo al resultado ya que queda solo en el box
    }