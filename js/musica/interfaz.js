/*======================================
            INTERFAZ
======================================*/

/*======================================
        ACTUALIZAR INFORMACION
======================================*/

function actualizarInformacion() {

    const cancion = PLAYLIST[EstadoMusica.indice];

    EstadoMusica.nombreCancion.textContent =
        cancion.titulo;

    EstadoMusica.nombreArtista.textContent =
        cancion.artista;

    EstadoMusica.contador.textContent =
        `${EstadoMusica.indice + 1} / ${PLAYLIST.length}`;

}

/*======================================
        ACTUALIZAR BARRA
======================================*/

function actualizarBarra() {

    if (!EstadoMusica.audio.duration) {

        EstadoMusica.barra.style.width = "0%";

        return;

    }

    const porcentaje =

        (EstadoMusica.audio.currentTime /

            EstadoMusica.audio.duration) * 100;

    EstadoMusica.barra.style.width =
        porcentaje + "%";

}

/*======================================
        CAMBIAR VOLUMEN
======================================*/

function cambiarVolumen(valor) {

    EstadoMusica.volumen = valor / 100;

    EstadoMusica.audio.volume = EstadoMusica.volumen;

    EstadoMusica.audio.muted = false;

    actualizarIconoVolumen();

}

/*======================================
        SILENCIAR
======================================*/

function alternarSilencio() {

    const contenedor = document.querySelector(".musica__volumen");

    contenedor.classList.toggle("mostrar");

}

/*======================================
        ACTUALIZAR ICONO
======================================*/

function actualizarIconoVolumen() {

    const icono = EstadoMusica.btnVolumen.querySelector("i");

    if (EstadoMusica.audio.muted || EstadoMusica.audio.volume === 0) {

        icono.className = "fa-solid fa-volume-xmark";

    }

    else if (EstadoMusica.audio.volume < 0.4) {

        icono.className = "fa-solid fa-volume-low";

    }

    else {

        icono.className = "fa-solid fa-volume-high";

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