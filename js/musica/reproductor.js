/*======================================
        CONFIGURACION
======================================*/

audio.volume = 1;

/*======================================
        VARIABLES INTERNAS
======================================*/

let fadeInterval = null;

let cambioEnProceso = false;

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
        DESBLOQUEAR AUDIO
======================================*/

async function desbloquearAudio(){

    if(audioDesbloqueado){

        return true;

    }

    try{

        const promesa = audio.play();

        if(promesa){

            await promesa;

        }

        audio.pause();

        audio.currentTime = 0;

        audioDesbloqueado = true;

        return true;

    }

    catch(error){

        console.warn(

            "Safari aun no permite reproducir audio.",

            error

        );

        return false;

    }

}

/*======================================
        REPRODUCIR
======================================*/

async function reproducir(){

    const permitido =

        await desbloquearAudio();

    if(!permitido){

        return;

    }

    try{

        const promesa =

        audio.play();

        if(promesa){

            await promesa;

        }

        reproduciendo = true;

        reproduccionIniciada = true;

    }

    catch(error){

        console.error(

            "Error al reproducir.",

            error

        );

    }

}

/*======================================
        PAUSAR
======================================*/

function pausar(){

    audio.pause();

    reproduciendo = false;

}

/*======================================
        LIMPIAR FADE
======================================*/

function detenerFade(){

    if(fadeInterval){

        clearInterval(

            fadeInterval

        );

        fadeInterval = null;

    }

}


/*======================================
        FADE OUT
======================================*/

function fadeOut(callback){

    detenerFade();

    fadeInterval = setInterval(()=>{

        if(audio.volume > 0.05){

            audio.volume -= ultimoVolumen / 20;

        }

        else{

            detenerFade();

            audio.pause();

            audio.volume = 0;

            if(typeof callback === "function"){

                callback();

            }

        }

    },40);

}

/*======================================
        FADE IN
======================================*/

async function fadeIn(){

    detenerFade();

    const permitido =

        await desbloquearAudio();

    if(!permitido){

        return;

    }

    audio.volume = 0;

    try{

        const promesa =

        audio.play();

        if(promesa){

            await promesa;

        }

        reproduciendo = true;

        reproduccionIniciada = true;

    }

    catch(error){

        console.error(

            "No fue posible iniciar la reproduccion.",

            error

        );

        return;

    }

    fadeInterval = setInterval(()=>{

        if(audio.volume < ultimoVolumen - 0.05){

            audio.volume += ultimoVolumen / 20;

        }

        else{

            audio.volume = ultimoVolumen;

            detenerFade();

        }

    },40);

}

/*======================================
        CAMBIAR CANCION
======================================*/

async function cambiarCancion(indice){

    if(cambioEnProceso){

        return;

    }

    cambioEnProceso = true;

    indiceActual = indice;

    if(indiceActual >= PLAYLIST.length){

        indiceActual = 0;

    }

    if(indiceActual < 0){

        indiceActual = PLAYLIST.length - 1;

    }

    cargarCancion();

    try{

        await fadeIn();

    }

    finally{

        cambioEnProceso = false;

    }

}

