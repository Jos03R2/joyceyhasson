/*======================================
        ELEMENTOS
======================================*/

const audio =
document.getElementById("audio");

const btnPlay =
document.getElementById("btnPlay");

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

audio.volume = 1;

/*======================================
        CARGAR CANCION
======================================*/

function cargarCancion(){

    const cancion = PLAYLIST[indiceActual];

    audio.src = cancion.archivo;

    nombreCancion.textContent =
    cancion.titulo;

    nombreArtista.textContent =
    cancion.artista;

    contadorPlaylist.textContent =
    `${indiceActual + 1} / ${PLAYLIST.length}`;

}

/*======================================
        PLAY
======================================*/

function reproducir(){

    audio.play();

    reproduciendo = true;

    btnPlay.innerHTML =

    '<i class="fa-solid fa-pause"></i>';

}

/*======================================
        PAUSA
======================================*/

function pausar(){

    audio.pause();

    reproduciendo = false;

    btnPlay.innerHTML =

    '<i class="fa-solid fa-play"></i>';

}

/*======================================
        PLAY / PAUSA
======================================*/

btnPlay.addEventListener(

    "click",

    ()=>{

        if(reproduciendo){

            pausar();

        }

        else{

            reproducir();

        }

    }

);

/*======================================
        FADE OUT
======================================*/

function fadeOut(callback){

    const volumenInicial = audio.volume;

    const intervalo = setInterval(()=>{

        if(audio.volume > 0.05){

            audio.volume -= volumenInicial / 20;

        }

        else{

            clearInterval(intervalo);

            audio.pause();

            audio.volume = 0;

            callback();

        }

    },40);

}

/*======================================
        FADE IN
======================================*/

function fadeIn(){

    audio.volume = 0;

    audio.play();

    reproduciendo = true;

    btnPlay.innerHTML =

    '<i class="fa-solid fa-pause"></i>';

    const intervalo = setInterval(()=>{

        if(audio.volume < ultimoVolumen - 0.05){

            audio.volume += ultimoVolumen / 20;

        }

        else{

            audio.volume = ultimoVolumen;

            clearInterval(intervalo);

        }

    },40);

}

/*======================================
        CAMBIAR CANCION
======================================*/

function cambiarCancion(indice){

    indiceActual = indice;

    if(indiceActual >= PLAYLIST.length){

        indiceActual = 0;

    }

    if(indiceActual < 0){

        indiceActual = PLAYLIST.length - 1;

    }

    cargarCancion();

    fadeIn();

}

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

btnSiguiente.addEventListener(

    "click",

    ()=>{

        siguienteCancion();

    }

);

/*======================================
        BOTON ANTERIOR
======================================*/

btnAnterior.addEventListener(

    "click",

    ()=>{

        anteriorCancion();

    }

);

/*======================================
        PROGRESO
======================================*/

function actualizarProgreso(){

    if(audio.duration){

        const porcentaje =

            (audio.currentTime / audio.duration) * 100;

        barraProgreso.style.width =

            porcentaje + "%";

    }

}

/*======================================
        CLICK EN LA BARRA
======================================*/

barra.addEventListener(

    "click",

    (e)=>{

        const ancho =

            barra.clientWidth;

        const click =

            e.offsetX;

        const porcentaje =

            click / ancho;

        audio.currentTime =

            porcentaje * audio.duration;

    }

);

/*======================================
        ACTUALIZAR BARRA
======================================*/

audio.addEventListener(

    "timeupdate",

    actualizarProgreso

);

/*======================================
        FIN DE CANCION
======================================*/

audio.addEventListener(

    "ended",

    ()=>{

        if(repetir){

            siguienteCancion();

        }

        else{

            pausar();

        }

    }

);

/*======================================
        CANCION LISTA
======================================*/

audio.addEventListener(

    "loadedmetadata",

    ()=>{

        actualizarProgreso();

    }

);

/*======================================
        ERROR
======================================*/

audio.addEventListener(

    "error",

    ()=>{

        console.error(

            "No se pudo cargar:",

            PLAYLIST[indiceActual].archivo

        );

    }

);


/*======================================
        BOTON ALEATORIO
======================================*/

btnAleatorio.addEventListener(

    "click",

    ()=>{

        aleatorio = !aleatorio;

        btnAleatorio.classList.toggle(

            "activo",

            aleatorio

        );

    }

);

/*======================================
        BOTON REPETIR
======================================*/

btnRepetir.addEventListener(

    "click",

    ()=>{

        repetir = !repetir;

        btnRepetir.classList.toggle(

            "activo",

            repetir

        );

    }

);

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

/*======================================
        INICIAR
======================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        /*------------------------------
            CARGAR PRIMERA CANCION
        ------------------------------*/

        cargarCancion();

        /*------------------------------
            PLAY INICIAL
        ------------------------------*/

        btnPlay.innerHTML =

        '<i class="fa-solid fa-play"></i>';

        /*------------------------------
            PROGRESO
        ------------------------------*/

        barraProgreso.style.width = "0%";

        /*------------------------------
            VOLUMEN
        ------------------------------*/

        audio.volume = 1;

        ultimoVolumen = 1;

        sliderVolumen.value = 100;

        actualizarIconoVolumen();

        /*------------------------------
            OCULTAR SLIDER
        ------------------------------*/

        volumenVisible = false;

        contenedorVolumen.classList.remove(

            "activo"

        );

    }

);