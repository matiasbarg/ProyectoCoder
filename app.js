

let marcador_general = 0
let marcador_historia = 0
let marcador_geografia = 0
let marcador_cultura = 0


let cuestionario_historia = [
    {pregunta:"¿Quién descubrió América?" , respuesta:"Colón" , opciones:"Colón, Magallanes, Washington, Los Vikingos"},
    {pregunta:"¿En que año se declaró la independencia de Argentina?" , respuesta:"1816" , opciones:"1994, 1492, 2001, 1816"},
    {pregunta:"¿Quién fue el primer presidente de Argentina?" , respuesta:"Rivadavia" , opciones:"San Martin, Belgrano, Rivadavia,Washington"},
]

let cuestionario_geografia = [
    {pregunta:"Cuantos continentes hay en el mundo" , respuesta:7 , opciones:"5 , 6 , 7 , 8"},
    {pregunta:"¿Cual es la capital de Paraguay?" , respuesta:"Asunción" , opciones:"Buenos Aires, La Paz, Montevideo , Asunción"},
    {pregunta:"¿Cual es la montaña mas alta del mundo?" , respuesta:"Everest" , opciones:"Aconcagua, Machu Pichu, Everest, Los Andes"},
]

let cuestionario_cultura = [
    {pregunta:" ¿Quién es el autor de la frase ``Pienso, luego existo``?" , respuesta:"Descartes" , opciones:"Platon, Galileo Galilei, Descartes, Sócrates"},
    {pregunta:"¿Cuál es el libro más vendido en el mundo después de la Biblia?" , respuesta:"Don Quijote" , opciones:"El Señor de los Anillos, Don Quijote, El Principitol, Cien años de Soledad"},
    {pregunta:"¿Cuántos decimales tiene el número pi π?" , respuesta:"infinitos" , opciones:"2 , 100, infinitos, 1000"},
]

console.log("Vamos a jugar a preguntas y respuestas");
console.log("Vamos a jugar la categoría Historia");



for(let question of cuestionario_historia){
    console.log(question.pregunta);
    console.log(question.opciones);
    let resp = prompt("Escriba la respuesta:");
    if(resp == question.respuesta){
        console.log("Correcto, respondiste " , question.respuesta);
        marcador_general++;
        marcador_historia++;
        console.log("su puntaje es: " , marcador_general);
    }
    else{
        console.log("incorrecto");
        console.log("la respuesta correcta es: " , question.respuesta);
        console.log("su puntaje es: " , marcador_general);
    }
}

console.log("Terminamos con las preguntas de historia, respondiste " , marcador_historia);
console.log("Vamos a la categoría Geografía");

for(let question of cuestionario_geografia){
    console.log(question.pregunta);
    console.log(question.opciones);
    let resp = prompt("Escriba la respuesta:");
    if(resp == question.respuesta){
        console.log("Correcto, respondiste " , question.respuesta);
        marcador_general++;
        marcador_geografia++;
        console.log("su puntaje es: " , marcador_general);
    }
    else{
        console.log("incorrecto");
        console.log("la respuesta correcta es: " , question.respuesta);
        console.log("su puntaje es: " , marcador_general);
    }
}

console.log("Terminamos con las preguntas de geografía, respondiste " , marcador_geografia , "correctas.");
console.log("Vamos a la categoría de Cultura General")

for(let question of cuestionario_cultura){
    console.log(question.pregunta);
    console.log(question.opciones);
    let resp = prompt("Escriba la respuesta:");
    if(resp == question.respuesta){
        console.log("Correcto, respondiste " , question.respuesta);
        marcador_general++;
        marcador_cultura++;
        console.log("su puntaje es: " , marcador_general);
    }
    else{
        console.log("incorrecto");
        console.log("la respuesta correcta es: " , question.respuesta)
        console.log("su puntaje es: " , marcador_general);
    }
}

console.log("Terminamos con las preguntas de Cultura general, respondiste " , marcador_cultura , "correctas.");


console.log("Tu puntaje general fue:");
console.log(marcador_historia , " aciertos en la categoría historia");
console.log(marcador_geografia , " aciertos en la categoría geografía");
console.log(marcador_cultura , " aciertos en la categoría Cultura general");
console.log(marcador_general , " puntos en total.");

if(marcador_general == (cuestionario_historia.length + cuestionario_geografia.length + cuestionario_cultura.length)){
    console.log("Respondiste todas las preguntas correctamente!");
}
else{
    console.log("te faltaron " , ((cuestionario_historia.length + cuestionario_geografia.length + cuestionario_cultura.length) - marcador_general) , " para el puntaje perfecto")
}
