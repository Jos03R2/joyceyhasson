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

    EstadoMusica.audio.volume =
        EstadoMusica.volumen;

}

/*======================================
        SILENCIAR
======================================*/

function alternarSilencio() {

    if (EstadoMusica.audio.volume > 0) {

        EstadoMusica.audio.volume = 0;

        EstadoMusica.sliderVolumen.value = 0;

    }

    else {

        EstadoMusica.audio.volume =
            EstadoMusica.volumen;

        EstadoMusica.sliderVolumen.value =
            EstadoMusica.volumen * 100;

    }

}

/*======================================
        REINICIAR BARRA
======================================*/

function reiniciarBarra() {

    EstadoMusica.barra.style.width = "0%";

}