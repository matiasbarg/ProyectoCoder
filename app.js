
const numeroPregunta = document.querySelector(".numeroPregunta");
const textoPregunta = document.querySelector(".textoPregunta");
const containerOpciones = document.querySelector(".containerOpciones");
const resultadoRespuesta = document.querySelector(".resultadoRespuesta");
<<<<<<< HEAD
//const botonResponder = document.querySelector(".botonResponder")
//const inputResp = document.getElementById("respuesta");
const txtanswr = document.getElementsByClassName(".option");
=======
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
>>>>>>> dea704903f7d2ee20deb80c2129f2319038a33f7


//TRAER PREGUNTA

<<<<<<< HEAD
let next = document.getElementById("siguiente")
next.addEventListener("click" , siguiente);

let preguntasDisponibles = [];
let opcionesDisponibles = [];
let contadorPreguntas = 0;
let preguntaActual;
let marcador = 0;
let errores = 0;


//PREGUNTAS DISPONIBLES

function definirPreguntasDisponibles(){
    const totalPreguntas = cuestionario.length;
    for(let i=0; i<totalPreguntas; i++){
        preguntasDisponibles.push(cuestionario[i])
    }
}




//TRAER PREGUNTA

=======
>>>>>>> dea704903f7d2ee20deb80c2129f2319038a33f7
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
<<<<<<< HEAD
        option.id = optionIndex;
        option.className = "option";
        containerOpciones.appendChild(option);
        option.setAttribute("onclick" , "responder(this)")
=======
        option.className = "option";
        containerOpciones.appendChild(option)
>>>>>>> dea704903f7d2ee20deb80c2129f2319038a33f7
    }
    contadorPreguntas++
}

<<<<<<< HEAD

//Toma valor del id del elemento option clickeado y lo compara con el valor respuesta del array del cuestionario
function responder(element){
    const id = parseInt(element.id);
    if(id === preguntaActual.answer){
        marcador++
        resultadoRespuesta.innerHTML = "Correcto! Aciertos: " + marcador;
        resultadoRespuesta.classList.add("correcto");
        resultadoRespuesta.classList.remove("incorrecto");
        element.classList.add("acierto");
        //document.getElementsByTagName("input")[0].value = "";
    }
    else{
        errores++;
        resultadoRespuesta.innerHTML = "Incorrecto! Fallos: " + errores;
        resultadoRespuesta.classList.add("incorrecto");
        resultadoRespuesta.classList.remove("correcto");
        const largoOpciones = containerOpciones.children.length;
        for(i=0; i<largoOpciones; i++){
            if(parseInt(containerOpciones.children[i].id) === preguntaActual.answer){
                containerOpciones.children[i].classList.add("acierto");
            }
        }
        element.classList.add("error");
        //document.getElementsByTagName("input")[0].value = "";
    }
    restringido();
}

function restringido(){
    const largoOpciones = containerOpciones.children.length;
    for(let i=0; i<largoOpciones; i++){
        containerOpciones.children[i].classList.add("respondida")
=======
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
>>>>>>> dea704903f7d2ee20deb80c2129f2319038a33f7
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
<<<<<<< HEAD

            traerPregunta();
        }
    }

    //Eliminar todos los elementos del box salvo el resultado al fnalizar

    function finalizar(){
        next.remove();
        textoPregunta.remove();
        containerOpciones.remove();
        resultadoRespuesta.classList.remove("correcto" , "incorrecto");
        resultadoRespuesta.classList.add("margen"); //le doy mas margen arriba y abajo al resultado ya que queda solo en el box
    }

    window.onload = function(){
        definirPreguntasDisponibles();
        traerPregunta();
    }
/*
    txtanswr.onclick = function(){
        console.log(this.txtanswr.value);
        inputResp.innerHTML = option.value;
    }*/
=======
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
>>>>>>> dea704903f7d2ee20deb80c2129f2319038a33f7
