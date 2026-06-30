/*======================================
        ELEMENTOS
======================================*/

const abrirModal = document.getElementById("abrirConfirmacion");

const cerrarModal = document.getElementById("cerrarConfirmacion");

const modal = document.getElementById("modalConfirmacion");


/*======================================
        ABRIR MODAL
======================================*/

abrirModal.addEventListener("click", () => {

    modal.classList.add("activo");

    document.body.style.overflow = "hidden";

});


/*======================================
        CERRAR MODAL
======================================*/

cerrarModal.addEventListener("click", cerrar);


/*======================================
        CERRAR FUERA DEL MODAL
======================================*/

modal.addEventListener("click", (e)=>{

    if(e.target===modal){

        cerrar();

    }

});


/*======================================
        FUNCION CERRAR
======================================*/

function cerrar(){

    modal.classList.remove("activo");

    document.body.style.overflow="auto";

}