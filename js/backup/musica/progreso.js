/*======================================
        PROGRESO
======================================*/

function actualizarProgreso(){

    if(audio.duration){

        const porcentaje =

            (audio.currentTime / audio.duration) * 100;

        barraProgreso.style.width =

            porcentaje + "%";

    }

}

/*======================================
        CLICK EN LA BARRA
======================================*/

barra.addEventListener(

    "click",

    (e)=>{

        const ancho =

            barra.clientWidth;

        const click =

            e.offsetX;

        const porcentaje =

            click / ancho;

        audio.currentTime =

            porcentaje * audio.duration;

    }

);

/*======================================
        ACTUALIZAR BARRA
======================================*/

audio.addEventListener(

    "timeupdate",

    actualizarProgreso

);