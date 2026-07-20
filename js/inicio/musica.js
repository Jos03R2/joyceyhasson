/*======================================
        ELEMENTOS
======================================*/

const audio =
document.getElementById("audio");



const btnAnterior =
document.getElementById("btnAnterior");

const btnSiguiente =
document.getElementById("btnSiguiente");

const btnAleatorio =
document.getElementById("btnAleatorio");

const btnRepetir =
document.getElementById("btnRepetir");

const btnVolumen =
document.getElementById("btnVolumen");

const sliderVolumen =
document.getElementById("sliderVolumen");

const contenedorVolumen =
document.querySelector(".musica__volumen");

const nombreCancion =
document.getElementById("nombreCancion");

const nombreArtista =
document.getElementById("nombreArtista");

const contadorPlaylist =
document.getElementById("contadorPlaylist");

const barraProgreso =
document.getElementById("barraProgreso");

const barra =
document.querySelector(".musica__barra");

/*======================================
        VARIABLES
======================================*/

let indiceActual = 0;

let reproduciendo = false;

let aleatorio = false;

let repetir = true;

let ultimoVolumen = 1;

let volumenVisible = false;

/*======================================
        CONFIGURACION
======================================*/



/*======================================
        OBTENER SIGUIENTE
======================================*/

function obtenerSiguienteIndice(){

    if(aleatorio){

        let nuevo;

        do{

            nuevo = Math.floor(

                Math.random() *

                PLAYLIST.length

            );

        }

        while(

            nuevo === indiceActual &&

            PLAYLIST.length > 1

        );

        return nuevo;

    }

    return indiceActual + 1;

}

/*======================================
        SIGUIENTE
======================================*/

function siguienteCancion(){

    fadeOut(()=>{

        cambiarCancion(

            obtenerSiguienteIndice()

        );

    });

}

/*======================================
        ANTERIOR
======================================*/

function anteriorCancion(){

    fadeOut(()=>{

        cambiarCancion(

            indiceActual - 1

        );

    });

}

/*======================================
        BOTON SIGUIENTE
======================================*/

/*======================================
        MOSTRAR VOLUMEN
======================================*/

btnVolumen.addEventListener(

    "click",

    (e)=>{

        e.stopPropagation();

        volumenVisible = !volumenVisible;

        contenedorVolumen.classList.toggle(

            "activo",

            volumenVisible

        );

    }

);

/*======================================
        CONTROL DE VOLUMEN
======================================*/

sliderVolumen.addEventListener(

    "input",

    ()=>{

        audio.volume =

        sliderVolumen.value / 100;

        ultimoVolumen =

        audio.volume;

        actualizarIconoVolumen();

    }

);

/*======================================
        ICONO VOLUMEN
======================================*/

function actualizarIconoVolumen(){

    const icono =

    btnVolumen.querySelector("i");

    if(audio.volume === 0){

        icono.className =

        "fa-solid fa-volume-xmark";

    }

    else if(audio.volume < .50){

        icono.className =

        "fa-solid fa-volume-low";

    }

    else{

        icono.className =

        "fa-solid fa-volume-high";

    }

}

/*======================================
        CERRAR VOLUMEN
======================================*/

document.addEventListener(

    "click",

    (e)=>{

        if(

            !contenedorVolumen.contains(e.target)

            &&

            !btnVolumen.contains(e.target)

        ){

            volumenVisible = false;

            contenedorVolumen.classList.remove(

                "activo"

            );

        }

    }

);
