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

async function siguienteCancion(){

    if(cambioEnProceso){

        return;

    }

    fadeOut(

        async ()=>{

            await cambiarCancion(

                obtenerSiguienteIndice()

            );

        }

    );

}

/*======================================
        ANTERIOR
======================================*/

async function anteriorCancion(){

    if(cambioEnProceso){

        return;

    }

    fadeOut(

        async ()=>{

            await cambiarCancion(

                indiceActual - 1

            );

        }

    );

}