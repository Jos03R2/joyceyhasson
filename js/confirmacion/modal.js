/*======================================
        VARIABLES
======================================*/

const abrirConfirmacion = document.getElementById("abrirConfirmacion");

const cerrarConfirmacion = document.getElementById("cerrarConfirmacion");

const modalConfirmacion = document.getElementById("modalConfirmacion");

/*======================================
        ABRIR MODAL
======================================*/

abrirConfirmacion.addEventListener("click", () => {

    modalConfirmacion.classList.add("activo");

});

/*======================================
        CERRAR MODAL
======================================*/

cerrarConfirmacion.addEventListener("click", () => {

    modalConfirmacion.classList.remove("activo");

});

/*======================================
        CERRAR HACIENDO CLICK AFUERA
======================================*/

modalConfirmacion.addEventListener("click", (e) => {

    if (e.target === modalConfirmacion) {

        modalConfirmacion.classList.remove("activo");

    }

});