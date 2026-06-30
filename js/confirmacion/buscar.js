/*======================================
        CONFIGURACION
======================================*/

// Pega aquí la URL de tu Google Apps Script
const URL_SCRIPT =
"https://script.google.com/macros/s/AKfycbw7GXfZUn4SbiHYFYwZGGKyPuaiXRW1uoDgpp99ZDqNmpGsaXxQucpT4aFHnJ_f9lEc/exec";


/*======================================
        ELEMENTOS
======================================*/

const btnBuscar = document.getElementById("btnBuscar");

const inputApellido = document.getElementById("buscarApellido");

const resultadoBusqueda = document.getElementById("resultadoBusqueda");


/*======================================
        BUSCAR
======================================*/

btnBuscar.addEventListener("click", buscarFamilia);


/*======================================
        ENTER
======================================*/

inputApellido.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        buscarFamilia();

    }

});


/*======================================
        FUNCION
======================================*/

/*======================================
        FUNCION BUSCAR
======================================*/

async function buscarFamilia(){

    const texto = inputApellido.value.trim();

    if(texto===""){

        alert("Ingrese el apellido o ID de la familia.");

        return;

    }

    resultadoBusqueda.innerHTML =
    "<p style='text-align:center'>Buscando invitación...</p>";

    try{

        const respuesta =
        await fetch(

            URL_SCRIPT +
            "?buscar=" +
            encodeURIComponent(texto)

        );

        const datos =
        await respuesta.json();

        if(!datos.encontrado){

            resultadoBusqueda.innerHTML=

            "<p style='text-align:center;color:#b33;'>No se encontró ninguna familia.</p>";

            return;

        }

        mostrarFormulario(datos);

    }

    catch(error){

        console.error(error);

        resultadoBusqueda.innerHTML=

        "<p style='text-align:center;color:red;'>Error al conectar con Google Sheets.</p>";

    }

}

/*======================================
        MOSTRAR FORMULARIO
======================================*/

function mostrarFormulario(datos){

    resultadoBusqueda.innerHTML = `

    <div class="confirmacion__resultado">

        <div class="confirmacion__familia">

            <h3>${datos.familia}</h3>

            <p>Invitados</p>

        </div>

        <div class="confirmacion__invitados">

            ${datos.integrantes.map(nombre=>`

                <label class="confirmacion__opcion">

                    <input
                        type="checkbox"
                        checked
                        disabled>

                    <span>${nombre}</span>

                </label>

            `).join("")}

        </div>

        <div class="confirmacion__mensaje">

            <label>

                Déjanos un mensaje

            </label>

            <textarea

                id="mensaje"

                placeholder="Escribe un bonito mensaje para los novios...">

            </textarea>

        </div>

        <button

            class="confirmacion__enviar"

            id="btnEnviar">

            Confirmar asistencia

        </button>

    </div>

    `;

}


