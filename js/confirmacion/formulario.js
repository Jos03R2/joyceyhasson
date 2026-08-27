/*======================================
        VARIABLES
======================================*/

const resultadoBusqueda =
document.getElementById("resultadoBusqueda");

let familiaActual = null;

/*======================================
        OBTENER CODIGO
======================================*/

function obtenerCodigo(){

    const parametros =
    new URLSearchParams(
        window.location.search
    );

    return parametros.get("codigo");

}

/*======================================
        CARGAR INVITACION
======================================*/

function cargarFamilia(){

    const codigo =
    obtenerCodigo();

    resultadoBusqueda.innerHTML = "";

    /*======================================
            SIN CODIGO
    ======================================*/

    if(!codigo){

        resultadoBusqueda.innerHTML = `

            <div class="confirmacion__familia">

                <h3>

                    Invitación de Joyce & Hasson

                </h3>

                <p class="confirmacion__descripcion-familia">

                    Gracias por acompañarnos y ser parte
                    de este momento tan especial.

                </p>

            </div>

        `;

        return;

    }

    /*======================================
            BUSCAR FAMILIA
    ======================================*/

    familiaActual =
    familias[codigo];

    /*======================================
            CODIGO INVALIDO
    ======================================*/

    if(!familiaActual){

        resultadoBusqueda.innerHTML = `

            <div class="confirmacion__familia">

                <h3>

                    Invitación de Joyce & Hasson

                </h3>

                <p class="confirmacion__descripcion-familia">

                    Gracias por visitar nuestra invitación.

                </p>

            </div>

        `;

        return;

    }

    /*======================================
            MENSAJE FINAL
    ======================================*/

    const html = `

        <div class="confirmacion__familia">

            <h3>

                ${familiaActual.familia}

            </h3>

            <p class="confirmacion__descripcion-familia">

                Nos llena de alegría compartir este momento
                tan especial con ustedes.

            </p>

        </div>


        <div class="confirmacion__cerrada">

            <div class="confirmacion__cerrada-icono">

                <i class="fa-solid fa-heart"></i>

            </div>

            <h3>

                El período de confirmación
                ha finalizado

            </h3>

            <p>

                Agradecemos de todo corazón a nuestros
                familiares y amigos que confirmaron su
                asistencia.

            </p>

            <p>

                Estamos muy emocionados de celebrar este
                día tan especial junto a todos ustedes.

            </p>

            <div class="confirmacion__cerrada-fecha">

                <i class="fa-solid fa-champagne-glasses"></i>

                <span>

                    ¡Nos vemos muy pronto!

                </span>

            </div>

        </div>

    `;

    resultadoBusqueda.innerHTML = html;

}

/*======================================
        INICIAR
======================================*/

document.addEventListener(

    "DOMContentLoaded",

    cargarFamilia

);