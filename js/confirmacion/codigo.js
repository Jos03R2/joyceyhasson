/*======================================
        CONFIGURACIÓN
======================================*/

const URL_API =
"https://script.google.com/macros/s/AKfycbz3qfgnrSCSzblRBPbtSWwbKc3SDRJ_MA5WdQoS1Af6eXwC1fQH7rZzvqto4fFxOVTq/exec";


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

    const parametros =

        new URLSearchParams(

            window.location.search

        );

    const codigo =

        parametros.get("codigo");

    console.log("Código recibido:",codigo);

    if(!codigo){

        return;

    }

    try{

        const respuesta =

            await fetch(

                URL_API +

                "?codigo=" +

                encodeURIComponent(codigo)

            );

        const datos =

            await respuesta.json();

        mostrarFamilia(datos);

    }

    catch(error){

        console.error(error);

    }

}


/*======================================
        MOSTRAR FAMILIA
======================================*/

function mostrarFamilia(datos){

    const contenedor =

        document.getElementById(

            "resultadoBusqueda"

        );

    if(!datos.encontrado){

        contenedor.innerHTML=`

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

    let html=`

        <div class="confirmacion__familia">

            <h3>${datos.familia}</h3>

            <p>

                Nos llena de alegría compartir este momento tan especial con ustedes.

            </p>

        </div>

        <div class="confirmacion__opciones">

    `;

    datos.integrantes.forEach(function(nombre,index){

        html+=`

            <label class="confirmacion__opcion">

                <input

                    type="checkbox"

                    checked

                    id="integrante${index}"

                >

                <span>${nombre}</span>

            </label>

        `;

    });

    html+=`

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

    contenedor.innerHTML=html;

}