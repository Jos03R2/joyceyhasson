/*======================================
        ELEMENTOS
======================================*/

const menu =
document.getElementById("menu");

const menuToggle =
document.getElementById("menuToggle");

const menuCerrar =
document.getElementById("menuCerrar");

const menuOverlay =
document.getElementById("menuOverlay");

const menuLinks =
document.querySelectorAll(".menu__lista a");

const secciones =
document.querySelectorAll("main section");

/*======================================
        ABRIR MENU
======================================*/

function abrirMenu(){

    menu.classList.add("activo");

    menuOverlay.classList.add("activo");

    menuToggle.classList.add("activo");

    document.body.style.overflow = "hidden";

    animarOpciones();

}

/*======================================
        CERRAR MENU
======================================*/

function cerrarMenu(){

    menu.classList.remove("activo");

    menuOverlay.classList.remove("activo");

    menuToggle.classList.remove("activo");

    document.body.style.overflow = "auto";

}

/*======================================
        ANIMAR OPCIONES
======================================*/

function animarOpciones(){

    menuLinks.forEach(

        (link,index)=>{

            link.style.opacity = "0";

            link.style.transform =

            "translateX(25px)";

            setTimeout(()=>{

                link.style.transition =

                ".45s";

                link.style.opacity = "1";

                link.style.transform =

                "translateX(0)";

            },

            index*70);

        }

    );

}

/*======================================
        BOTON MENU
======================================*/

menuToggle.addEventListener(

    "click",

    ()=>{

        if(

            menu.classList.contains(

                "activo"

            )

        ){

            cerrarMenu();

        }

        else{

            abrirMenu();

        }

    }

);

/*======================================
        BOTON CERRAR
======================================*/

if(menuCerrar){

    menuCerrar.addEventListener(

        "click",

        cerrarMenu

    );

}

/*======================================
        OVERLAY
======================================*/

menuOverlay.addEventListener(

    "click",

    cerrarMenu

);

/*======================================
        CERRAR AL DAR CLICK
======================================*/

menuLinks.forEach(

    link=>{

        link.addEventListener(

            "click",

            ()=>{

                cerrarMenu();

            }

        );

    }

);

/*======================================
        SECCION ACTIVA
======================================*/

window.addEventListener(

    "scroll",

    ()=>{

        let actual = "";

        secciones.forEach(

            seccion=>{

                const top =

                    seccion.offsetTop - 180;

                const height =

                    seccion.offsetHeight;

                if(

                    window.scrollY >= top &&

                    window.scrollY <

                    top + height

                ){

                    actual =

                    seccion.getAttribute("id");

                }

            }

        );

        menuLinks.forEach(

            link=>{

                link.classList.remove(

                    "activo"

                );

                if(

                    link.getAttribute("href") ===

                    "#" + actual

                ){

                    link.classList.add(

                        "activo"

                    );

                }

            }

        );

    }

);