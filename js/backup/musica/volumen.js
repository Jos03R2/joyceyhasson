/*======================================
        MOSTRAR VOLUMEN
======================================*/

btnVolumen.addEventListener(

    "click",

    (e)=>{

        e.stopPropagation();

        volumenVisible = !volumenVisible;

        contenedorVolumen.classList.toggle(

            "activo",

            volumenVisible

        );

    }

);

/*======================================
        CONTROL DE VOLUMEN
======================================*/

sliderVolumen.addEventListener(

    "input",

    ()=>{

        audio.volume =

        sliderVolumen.value / 100;

        ultimoVolumen =

        audio.volume;

        actualizarIconoVolumen();

    }

);

/*======================================
        ICONO VOLUMEN
======================================*/

function actualizarIconoVolumen(){

    const icono =

    btnVolumen.querySelector("i");

    if(audio.volume === 0){

        icono.className =

        "fa-solid fa-volume-xmark";

    }

    else if(audio.volume < .50){

        icono.className =

        "fa-solid fa-volume-low";

    }

    else{

        icono.className =

        "fa-solid fa-volume-high";

    }

}

/*======================================
        CERRAR VOLUMEN
======================================*/

document.addEventListener(

    "click",

    (e)=>{

        if(

            !contenedorVolumen.contains(e.target)

            &&

            !btnVolumen.contains(e.target)

        ){

            volumenVisible = false;

            contenedorVolumen.classList.remove(

                "activo"

            );

        }

    }

);