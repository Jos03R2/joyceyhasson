/*======================================
        CONFIGURACIÓN
======================================*/

const URL_API =
"https://script.google.com/macros/s/AKfycbwWGpaJjSNqZNYziPCDe3IdlcJkhUFx3rFbzbtxeV7u7h12f9E71HyCAcjsNxJrLE5q/exec";


/*======================================
        INICIO
======================================*/

window.addEventListener(
    "DOMContentLoaded",
    iniciar
);


/*======================================
        FUNCIÓN PRINCIPAL
======================================*/

async function iniciar(){

    const parametros = new URLSearchParams(window.location.search);

    const codigo = parametros.get("codigo");

    console.log("Código recibido:", codigo);

    const contenedor = document.getElementById("resultadoBusqueda");

    if(!codigo){

        contenedor.innerHTML = `

            <div class="confirmacion__error">

                <i class="fa-solid fa-envelope-open-text"></i>

                <h3>Invitación personalizada</h3>

                <p>

                    Esta invitación utiliza un enlace único para cada familia.

                    <br><br>

                    Por favor abre el enlace que recibiste por WhatsApp para confirmar tu asistencia.

                </p>

            </div>

        `;

        return;

    }

    contenedor.innerHTML = `

        <div class="confirmacion__cargando">

            <i class="fa-solid fa-spinner fa-spin"></i>

            <p>Cargando invitación...</p>

        </div>

    `;

    try{

        const respuesta = await fetch(

            URL_API +
            "?codigo=" +
            encodeURIComponent(codigo)

        );

        const datos = await respuesta.json();

        mostrarFamilia(datos);

    }

    catch(error){

        console.error(error);

        contenedor.innerHTML = `

            <div class="confirmacion__error">

                <i class="fa-solid fa-circle-xmark"></i>

                <h3>Error de conexión</h3>

                <p>

                    No fue posible obtener la información de tu invitación.

                    Inténtalo nuevamente más tarde.

                </p>

            </div>

        `;

    }

}


/*======================================
        MOSTRAR FAMILIA
======================================*/

function mostrarFamilia(datos){

    const contenedor = document.getElementById("resultadoBusqueda");

    if(!datos.encontrado){

        contenedor.innerHTML = `

            <div class="confirmacion__error">

                <i class="fa-solid fa-circle-xmark"></i>

                <h3>Invitación no encontrada</h3>

                <p>

                    El código recibido no existe.

                </p>

            </div>

        `;

        return;

    }

    let html = `

        <div class="confirmacion__familia">

            <h3>${datos.familia}</h3>

            <p>

                Nos llena de alegría compartir este momento tan especial con ustedes.

            </p>

        </div>

        <div class="confirmacion__opciones">

    `;

    datos.integrantes.forEach(function(nombre,index){

        html += `

            <label class="confirmacion__opcion">

                <input
                    type="checkbox"
                    checked
                    id="integrante${index}">

                <span>${nombre}</span>

            </label>

        `;

    });

    html += `

        </div>

        <div class="confirmacion__mensaje">

            <label>

                Déjanos un mensaje

            </label>

            <textarea
                id="mensaje"
                rows="5"
                placeholder="Escribe aquí unas palabras para los novios...">

            </textarea>

        </div>

        <button
            id="btnEnviar"
            class="confirmacion__enviar">

            <i class="fa-solid fa-heart"></i>

            Confirmar asistencia

        </button>

    `;

    contenedor.innerHTML = html;

}