/*======================================
        BOTON SIGUIENTE
======================================*/

btnSiguiente.addEventListener(

    "click",

    ()=>{

        siguienteCancion();

    }

);

/*======================================
        BOTON ANTERIOR
======================================*/

btnAnterior.addEventListener(

    "click",

    ()=>{

        anteriorCancion();

    }

);

/*======================================
        BOTON ALEATORIO
======================================*/

btnAleatorio.addEventListener(

    "click",

    ()=>{

        aleatorio = !aleatorio;

        btnAleatorio.classList.toggle(

            "activo",

            aleatorio

        );

    }

);

/*======================================
        BOTON REPETIR
======================================*/

btnRepetir.addEventListener(

    "click",

    ()=>{

        repetir = !repetir;

        btnRepetir.classList.toggle(

            "activo",

            repetir

        );

    }

);