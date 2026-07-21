/*======================================
            ESTADO GLOBAL
======================================*/

const EstadoMusica = {

    /*==============================
            AUDIO
    ==============================*/

    audio: document.getElementById("audio"),

    /*==============================
            INFORMACION
    ==============================*/

    nombreCancion: document.getElementById("nombreCancion"),

    nombreArtista: document.getElementById("nombreArtista"),

    contador: document.getElementById("contadorPlaylist"),

    barra: document.getElementById("barraProgreso"),

    contenedorBarra: document.querySelector(".musica__barra"),

    /*==============================
            BOTONES
    ==============================*/

    btnAnterior: document.getElementById("btnAnterior"),

    btnSiguiente: document.getElementById("btnSiguiente"),

    btnAleatorio: document.getElementById("btnAleatorio"),

    btnRepetir: document.getElementById("btnRepetir"),

    btnVolumen: document.getElementById("btnVolumen"),

    sliderVolumen: document.getElementById("sliderVolumen"),

    /*==============================
            VARIABLES
    ==============================*/

    indice: 0,

    reproduciendo: false,

    aleatorio: false,

    repetir: false,

    volumen: 1

};