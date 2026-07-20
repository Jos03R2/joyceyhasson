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

        /*------------------------------
            DESBLOQUEAR SAFARI
        ------------------------------*/

        document.addEventListener(

            "pointerdown",

            async ()=>{

                if(audioDesbloqueado){

                    return;

                }

                await desbloquearAudio();

            },

            {

                once:true

            }

        );

    }

);