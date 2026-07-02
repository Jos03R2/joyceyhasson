/*======================================
        CONFIGURACIÓN
======================================*/

const URL_API_FORMULARIO =
"https://script.google.com/macros/s/AKfycbzpItYI_GoSOKKFFQ2vMjf_Nw-HdhdagIAaEBq4CCk2ZAL6qgTWqNV0oBmHhxgASc7W/exec";


/*======================================
        EVENTO
======================================*/

document.addEventListener(

    "click",

    async function(event){

        if(!event.target.closest("#btnEnviar")){
            return;
        }

        await enviarFormulario();

    }

);


/*======================================
        ENVIAR FORMULARIO
======================================*/

async function enviarFormulario(){

    const parametros =

        new URLSearchParams(

            window.location.search

        );

    const codigo =

        parametros.get("codigo");

    if(!codigo){

        mostrarMensaje(

            "Esta invitación no contiene un código válido."

        );

        return;

    }

    const familiaElemento =

        document.querySelector(

            ".confirmacion__familia h3"

        );

    if(!familiaElemento){

        mostrarMensaje(

            "No fue posible obtener la familia."

        );

        return;

    }

    const familia =

        familiaElemento.textContent.trim();

    const mensaje =

        document

            .getElementById("mensaje")

            .value

            .trim();

    const integrantes = [];

    document

        .querySelectorAll(

            ".confirmacion__opcion"

        )

        .forEach(function(opcion){

            integrantes.push({

                nombre:

                    opcion

                    .querySelector("span")

                    .textContent

                    .trim(),

                asiste:

                    opcion

                    .querySelector("input")

                    .checked

            });

        });

    const datos = {

        codigo:codigo,

        familia:familia,

        mensaje:mensaje,

        integrantes:integrantes

    };

    console.log("========== RSVP ==========");
    console.log(datos);

    const boton =

        document.getElementById(

            "btnEnviar"

        );

    boton.disabled = true;

    boton.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Enviando...

    `;

    try{

        const respuesta =

            await fetch(

                URL_API_FORMULARIO,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },

                    body:JSON.stringify(datos)

                }

            );

        const texto =

            await respuesta.text();

        console.log("========== RESPUESTA ==========");

        console.log(texto);

        mostrarMensaje(

            "¡Muchas gracias! Tu confirmación fue enviada."

        );

    }

    catch(error){

        console.error(error);

        mostrarMensaje(

            "Error al enviar la confirmación."

        );

    }

}


/*======================================
        MENSAJES
======================================*/

function mostrarMensaje(texto){

    alert(texto);

}