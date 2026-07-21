/*======================================
            CONTROLES
======================================*/

function iniciarControles() {

    EstadoMusica.btnSiguiente.addEventListener(

        "click",

        siguienteCancion

    );

    EstadoMusica.btnAnterior.addEventListener(

        "click",

        anteriorCancion

    );

    EstadoMusica.btnRepetir.addEventListener(

        "click",

        () => {

            EstadoMusica.repetir = !EstadoMusica.repetir;

            EstadoMusica.btnRepetir.classList.toggle(

                "activo",

                EstadoMusica.repetir

            );

        }

    );

    EstadoMusica.btnAleatorio.addEventListener(

        "click",

        () => {

            EstadoMusica.aleatorio = !EstadoMusica.aleatorio;

            EstadoMusica.btnAleatorio.classList.toggle(

                "activo",

                EstadoMusica.aleatorio

            );

        }

    );

    EstadoMusica.btnVolumen.addEventListener(

        "click",

        alternarSilencio

    );

    EstadoMusica.sliderVolumen.addEventListener(

        "input",

        (e) => {

            cambiarVolumen(e.target.value);

        }

    );

    EstadoMusica.audio.addEventListener(

        "timeupdate",

        actualizarBarra

    );

    EstadoMusica.audio.addEventListener(

        "ended",

        finalizarCancion

    );

}