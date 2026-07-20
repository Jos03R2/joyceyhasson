/*======================================
        AUDIO LISTO
======================================*/

audio.addEventListener(

    "canplay",

    ()=>{

        if(

            reproduccionIniciada &&

            !reproduciendo

        ){

            reproducir();

        }

    }

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
        METADATA
======================================*/

audio.addEventListener(

    "loadedmetadata",

    ()=>{

        actualizarProgreso();

    }

);

/*======================================
        PLAY
======================================*/

audio.addEventListener(

    "play",

    ()=>{

        reproduciendo = true;

    }

);

/*======================================
        PAUSE
======================================*/

audio.addEventListener(

    "pause",

    ()=>{

        reproduciendo = false;

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