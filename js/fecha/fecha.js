/*=========================================
            FECHA DE LA BODA
=========================================*/

const fechaBoda = new Date("October 31, 2026 15:00:00").getTime();

/*=========================================
            ELEMENTOS
=========================================*/

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

/*=========================================
            ACTUALIZAR CONTADOR
=========================================*/

function actualizarContador(){

    const ahora = new Date().getTime();

    const diferencia = fechaBoda - ahora;

    if(diferencia <= 0){

        dias.textContent = "000";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";

        return;

    }

    const diasRestantes = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horasRestantes = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutosRestantes = Math.floor(
        (diferencia % (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const segundosRestantes = Math.floor(
        (diferencia % (1000 * 60))
        /
        1000
    );

    actualizarNumero(
    dias,
    diasRestantes
);

actualizarNumero(
    horas,
    String(horasRestantes).padStart(2,"0")
);

actualizarNumero(
    minutos,
    String(minutosRestantes).padStart(2,"0")
);

actualizarNumero(
    segundos,
    String(segundosRestantes).padStart(2,"0")
);

}

actualizarContador();

setInterval(actualizarContador,1000);


/*=========================================
        ANIMAR CAMBIO
=========================================*/

function actualizarNumero(
    elemento,
    valor
){

    if(elemento.textContent != valor){

        elemento.classList.add("cambiar");

        setTimeout(()=>{

            elemento.textContent = valor;

            elemento.classList.remove("cambiar");

        },170);

    }

}

/*=========================================
        APARICIÓN AL HACER SCROLL
=========================================*/

const bloqueFecha = document.querySelector(".fecha");

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            bloqueFecha.classList.add("visible");

        }

    });

},

{

    threshold:.25

}

);

observer.observe(bloqueFecha);