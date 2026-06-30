/*======================================
        CONFIGURACIÓN
======================================*/

const URL_API_FORMULARIO =
"https://script.google.com/macros/s/AKfycbz3qfgnrSCSzblRBPbtSWwbKc3SDRJ_MA5WdQoS1Af6eXwC1fQH7rZzvqto4fFxOVTq/exec";


/*======================================
        FORMULARIO RSVP
======================================*/

document.addEventListener(

    "click",

    function(event){

        if(event.target.closest("#btnEnviar")){

            obtenerDatosFormulario();

        }

    }

);


/*======================================
        OBTENER DATOS
======================================*/

async function obtenerDatosFormulario(){

    const parametros =

        new URLSearchParams(

            window.location.search

        );

    const codigo =

        parametros.get("codigo");

    const familia =

        document

            .querySelector(

                ".confirmacion__familia h3"

            )

            .textContent

            .trim();

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

            const checkbox =

                opcion.querySelector("input");

            const nombre =

                opcion.querySelector("span")

                .textContent

                .trim();

            integrantes.push({

                nombre:nombre,

                asiste:checkbox.checked

            });

        });


    const datos={

        codigo:codigo,

        familia:familia,

        mensaje:mensaje,

        integrantes:integrantes

    };


    console.log("========== RSVP ==========");

    console.log(datos);


    /*======================================
            PREPARAR FORMULARIO
    ======================================*/

    const formulario =

        new URLSearchParams();

    formulario.append(

        "codigo",

        datos.codigo

    );

    formulario.append(

        "familia",

        datos.familia

    );

    formulario.append(

        "mensaje",

        datos.mensaje

    );

    formulario.append(

        "integrantes",

        JSON.stringify(

            datos.integrantes

        )

    );


    /*======================================
            ENVIAR
    ======================================*/

    try{

        const respuesta =

            await fetch(

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

            alert(

                "¡Muchas gracias! Tu asistencia ha sido confirmada."

            );

            location.reload();

        }

        else if(resultado.status==="duplicado"){

            alert(

                "Esta invitación ya fue confirmada anteriormente."

            );

        }

        else{

            alert(

                "Ocurrió un error al guardar la información."

            );

        }

    }

    catch(error){

        console.error(error);

        alert(

            "No fue posible conectar con Google Sheets."

        );

    }

}