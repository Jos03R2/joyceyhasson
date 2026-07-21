/*======================================
            INTERFAZ
======================================*/
let temporizadorVolumen = null;
/*======================================
        ACTUALIZAR INFORMACION
======================================*/

function actualizarInformacion() {

    const cancion = PLAYLIST[EstadoMusica.indice];

    EstadoMusica.nombreCancion.classList.remove(
        "mostrar"
    );

    EstadoMusica.nombreArtista.classList.remove(
        "mostrar"
    );

    setTimeout(() => {

        EstadoMusica.nombreCancion.textContent =
            cancion.titulo;

        EstadoMusica.nombreArtista.textContent =
            cancion.artista;

        EstadoMusica.contador.textContent =
            `${EstadoMusica.indice + 1} / ${PLAYLIST.length}`;

        EstadoMusica.nombreCancion.classList.add(
            "mostrar"
        );

        EstadoMusica.nombreArtista.classList.add(
            "mostrar"
        );

    }, 180);

}

/*======================================
        ACTUALIZAR BARRA
======================================*/

function actualizarBarra() {

    if (!EstadoMusica.audio.duration) {

        EstadoMusica.barra.style.width = "0%";

        EstadoMusica.tiempoActual.textContent = "0:00";

        EstadoMusica.tiempoTotal.textContent = "0:00";

        return;

    }

    const porcentaje =

        (EstadoMusica.audio.currentTime /

            EstadoMusica.audio.duration) * 100;

    EstadoMusica.barra.style.width =
        porcentaje + "%";

    EstadoMusica.tiempoActual.textContent =
        formatearTiempo(
            EstadoMusica.audio.currentTime
        );

    EstadoMusica.tiempoTotal.textContent =
        formatearTiempo(
            EstadoMusica.audio.duration
        );

}

/*======================================
        CAMBIAR VOLUMEN
======================================*/

/*======================================
        CAMBIAR VOLUMEN
======================================*/

function cambiarVolumen(valor) {

    EstadoMusica.volumen = valor / 100;

    EstadoMusica.audio.volume = EstadoMusica.volumen;

    EstadoMusica.audio.muted = false;

    localStorage.setItem(

        "volumenMusica",

        EstadoMusica.volumen

    );

    actualizarIconoVolumen();

}

/*======================================
        SILENCIAR
======================================*/

/*======================================
        MOSTRAR VOLUMEN
======================================*/

function alternarSilencio() {

    const contenedor = document.querySelector(".musica__volumen");

    contenedor.classList.add("mostrar");

    clearTimeout(temporizadorVolumen);

    temporizadorVolumen = setTimeout(() => {

        contenedor.classList.remove("mostrar");

    }, 3000);

}

/*======================================
        ACTUALIZAR ICONO
======================================*/

function actualizarIconoVolumen() {

    const icono = EstadoMusica.btnVolumen.querySelector("i");

    const volumen = EstadoMusica.audio.volume;

    if (volumen === 0) {

        icono.className =

            "fa-solid fa-volume-xmark";

    }

    else if (volumen < 0.35) {

        icono.className =

            "fa-solid fa-volume-low";

    }

    else {

        icono.className =

            "fa-solid fa-volume-high";

    }

}

/*======================================
        CAMBIAR POSICION
======================================*/

function cambiarPosicion(evento) {

    console.log("Click en barra");

    const rect = EstadoMusica.contenedorBarra.getBoundingClientRect();

    const x = evento.clientX - rect.left;

    const porcentaje = x / rect.width;

    console.log("Porcentaje:", porcentaje);

    if (!EstadoMusica.audio.duration) {

        return;

    }

    EstadoMusica.audio.currentTime =
        porcentaje * EstadoMusica.audio.duration;

}

/*======================================
        REINICIAR BARRA
======================================*/

function reiniciarBarra() {

    EstadoMusica.barra.style.width = "0%";

}

/*======================================
        FORMATEAR TIEMPO
======================================*/

function formatearTiempo(segundos){

    if(isNaN(segundos)){

        return "0:00";

    }

    const minutos = Math.floor(segundos / 60);

    const seg = Math.floor(segundos % 60);

    return `${minutos}:${seg.toString().padStart(2,"0")}`;

}