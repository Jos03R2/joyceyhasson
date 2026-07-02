/*======================================
        CONFIGURACIÓN
======================================*/

const URL_API_FORMULARIO =
"https://script.google.com/macros/s/AKfycbxGyoiqrp6wUruRPl3uZMlT16eXPlSLZKw2m-hAXvV-KRJsgPP2pzSB9gXZiB9UuUCR/exec";


/*======================================
        EVENTO
======================================*/

document.addEventListener("click", async function(event){

    if(!event.target.closest("#btnEnviar")){
        return;
    }

    await enviarFormulario();

});


/*======================================
        ENVIAR FORMULARIO
======================================*/

async function enviarFormulario(){

    const parametros = new URLSearchParams(window.location.search);

    const codigo = parametros.get("codigo");

    if(!codigo){

        mostrarMensaje(
            "Esta invitación no contiene un código válido.",
            "error"
        );

        return;

    }

    const familiaElemento =
        document.querySelector(".confirmacion__familia h3");

    if(!familiaElemento){

        mostrarMensaje(
            "No fue posible obtener la familia.",
            "error"
        );

        return;

    }

    const familia = familiaElemento.textContent.trim();

    const mensaje =
        document.getElementById("mensaje").value.trim();

    const integrantes = [];

    document
        .querySelectorAll(".confirmacion__opcion")
        .forEach(function(opcion){

            integrantes.push({

                nombre:
                    opcion.querySelector("span").textContent.trim(),

                asiste:
                    opcion.querySelector("input").checked

            });

        });

    const datos = {

        codigo: codigo,
        familia: familia,
        mensaje: mensaje,
        integrantes: integrantes

    };

    console.log("========== RSVP ==========");
    console.log(datos);

    const boton =
        document.getElementById("btnEnviar");

    boton.disabled = true;

    boton.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Enviando...

    `;

    try{

        await fetch(

            URL_API_FORMULARIO,

            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(datos)

            }

        );

        mostrarMensaje(

            "¡Muchas gracias! Tu confirmación fue enviada.",

            "success"

        );

        setTimeout(function(){

            location.reload();

        },2000);

    }

    catch(error){

        console.error(error);

        mostrarMensaje(

            "No fue posible enviar la confirmación.",

            "error"

        );

        boton.disabled = false;

        boton.innerHTML = `

            <i class="fa-solid fa-heart"></i>

            Confirmar asistencia

        `;

    }

}


/*======================================
        MENSAJES
======================================*/

function mostrarMensaje(texto,tipo){

    alert(texto);

}