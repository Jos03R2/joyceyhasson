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

    audio.load();

    nombreCancion.textContent =
    cancion.titulo;

    nombreArtista.textContent =
    cancion.artista;

    contadorPlaylist.textContent =
    `${indiceActual + 1} / ${PLAYLIST.length}`;

}

/*======================================
        REPRODUCIR
======================================*/

async function reproducir(){

    try{

        const promesa = audio.play();

        if(promesa){

            await promesa;

        }

        reproduciendo = true;

        reproduccionIniciada = true;

    }

    catch(error){

        console.error(

            "No fue posible reproducir el audio.",

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
        TOGGLE PLAY
======================================*/

async function alternarReproduccion(){

    if(reproduciendo){

        pausar();

    }

    else{

        await reproducir();

    }

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
            audio.muted = false;

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

    audio.volume = 0;

    try{

        const promesa = audio.play();

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

        if(audio.volume < ultimoVolumen){

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

    if(indice >= PLAYLIST.length){

        indice = 0;

    }

    if(indice < 0){

        indice = PLAYLIST.length - 1;

    }

    indiceActual = indice;

    cargarCancion();

    await new Promise((resolve)=>{

        if(audio.readyState >= 3){

            resolve();

            return;

        }

        audio.addEventListener(

            "canplay",

            resolve,

            {

                once:true

            }

        );

    });

    try{

        await fadeIn();

    }

    finally{

        cambioEnProceso = false;

    }

}