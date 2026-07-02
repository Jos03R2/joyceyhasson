/*======================================
        CONFIGURACIÓN
======================================*/

const URL_API_FORMULARIO =
"https://script.google.com/macros/s/AKfycbwPZtVR80sZfiIg1SvVUKHOCJzsHRcB8KkzCvqlOnQeTIZXDsiqJwWxlINqnk-Zhwq8/exec";


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

    const formulario = new URLSearchParams();

    formulario.append("codigo",codigo);
    formulario.append("familia",familia);
    formulario.append("mensaje",mensaje);
    formulario.append(
        "integrantes",
        JSON.stringify(integrantes)
    );

    const boton =
        document.getElementById("btnEnviar");

    boton.disabled = true;

    boton.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Enviando...

    `;

    try{

        const respuesta = await fetch(

            URL_API_FORMULARIO,

            {

                method:"POST",

                body:formulario

            }

        );

        const resultado =
            await respuesta.json();

        console.log(resultado);

        if(resultado.status==="success"){

            mostrarMensaje(

                "¡Muchas gracias! Tu asistencia ha sido confirmada.",

                "success"

            );

            setTimeout(function(){

                location.reload();

            },2000);

            return;

        }

        if(resultado.status==="duplicado"){

            mostrarMensaje(

                "Esta invitación ya fue confirmada anteriormente.",

                "warning"

            );

            boton.disabled=false;

            boton.innerHTML=`

                <i class="fa-solid fa-heart"></i>

                Confirmar asistencia

            `;

            return;

        }

        throw new Error("Respuesta desconocida");

    }

    catch(error){

        console.error(error);

        mostrarMensaje(

            "No fue posible conectar con Google Sheets.",

            "error"

        );

        boton.disabled=false;

        boton.innerHTML=`

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