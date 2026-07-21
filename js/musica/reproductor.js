/*======================================
            REPRODUCTOR
======================================*/

/*======================================
        CARGAR CANCION
======================================*/

function cargarCancion() {

    const cancion = PLAYLIST[EstadoMusica.indice];

    EstadoMusica.audio.src = cancion.archivo;

    EstadoMusica.audio.load();

    reiniciarBarra();

    actualizarInformacion();

}

/*======================================
        REPRODUCIR
======================================*/

async function reproducirCancion() {

    try {

        await EstadoMusica.audio.play();

        EstadoMusica.reproduciendo = true;

    }

    catch (error) {

        console.error(error);

    }

}

/*======================================
        PAUSAR
======================================*/

function pausarCancion() {

    EstadoMusica.audio.pause();

    EstadoMusica.reproduciendo = false;

}

/*======================================
        CAMBIAR CANCION
======================================*/

async function cambiarCancion(indice) {

    if (indice < 0) {

        indice = PLAYLIST.length - 1;

    }

    if (indice >= PLAYLIST.length) {

        indice = 0;

    }

    EstadoMusica.indice = indice;

    cargarCancion();

    await reproducirCancion();

}

/*======================================
        SIGUIENTE
======================================*/

async function siguienteCancion() {

    if (EstadoMusica.aleatorio) {

        let nuevoIndice;

        do {

            nuevoIndice = Math.floor(

                Math.random() * PLAYLIST.length

            );

        }

        while (

            PLAYLIST.length > 1 &&

            nuevoIndice === EstadoMusica.indice

        );

        await cambiarCancion(nuevoIndice);

        return;

    }

    await cambiarCancion(

        EstadoMusica.indice + 1

    );

}

/*======================================
        ANTERIOR
======================================*/

async function anteriorCancion() {

    await cambiarCancion(

        EstadoMusica.indice - 1

    );

}

/*======================================
        FINALIZAR CANCION
======================================*/

async function finalizarCancion() {

    if (EstadoMusica.repetir) {

        EstadoMusica.audio.currentTime = 0;

        await reproducirCancion();

        return;

    }

    await siguienteCancion();

}