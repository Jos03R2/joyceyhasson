/*=========================================
        ANIMACIONES GENERALES
=========================================*/

const elementos = document.querySelectorAll(

".animar,.animar-izquierda,.animar-derecha,.animar-zoom"

);

const observador = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},

{

    threshold:.20

}

);

elementos.forEach(elemento=>{

    observador.observe(elemento);

});