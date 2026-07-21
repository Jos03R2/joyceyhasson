/*======================================
            MUSICA
======================================*/

cargarCancion();

EstadoMusica.nombreCancion.classList.add(
    "mostrar"
);

EstadoMusica.nombreArtista.classList.add(
    "mostrar"
);

const volumenGuardado =

    localStorage.getItem("volumenMusica");

if (volumenGuardado !== null) {

    cambiarVolumen(volumenGuardado * 100);

    EstadoMusica.sliderVolumen.value =

        volumenGuardado * 100;

}

else {

    cambiarVolumen(100);

}

actualizarIconoVolumen();

iniciarControles();

/*======================================
        FUNCION GLOBAL
======================================*/

async function reproducir() {

    await reproducirCancion();

}