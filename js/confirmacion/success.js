/*======================================
        VARIABLES
======================================*/

const modalSuccess =
document.getElementById("modalSuccess");

const successMessage =
document.getElementById("successMessage");

const cerrarSuccess =
document.getElementById("cerrarSuccess");

/*======================================
        MOSTRAR MODAL
======================================*/

function mostrarSuccess(mensaje){

    successMessage.textContent = mensaje;

    modalSuccess.classList.add("activo");

}

/*======================================
        CERRAR MODAL
======================================*/

cerrarSuccess.addEventListener("click",()=>{

    modalSuccess.classList.remove("activo");

    modalConfirmacion.classList.remove("activo");

    /*======================================
            RECONSTRUIR FORMULARIO
    ======================================*/

    cargarFamilia();

});