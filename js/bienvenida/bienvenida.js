/*======================================
        ELEMENTOS
======================================*/

const bienvenida =
document.getElementById("bienvenida");

const boton =
document.getElementById("abrirInvitacion");

/*======================================
        BLOQUEAR SCROLL
======================================*/

document.body.style.overflow = "hidden";

/*======================================
        ABRIR INVITACION
======================================*/

boton.addEventListener(

    "click",

    ()=>{

        /*==============================
                ANIMACION BOTON
        ==============================*/

        boton.classList.add(

            "presionado"

        );

        /*==============================
            INICIAR MUSICA
        ==============================*/

        setTimeout(

            ()=>{

                try{

                    reproducir();

                }

                catch(error){

                    console.error(error);

                }

            },

            250

        );

        /*==============================
            ANIMACION SALIDA
        ==============================*/

        setTimeout(

            ()=>{

                bienvenida.classList.add(

                    "cerrar"

                );

            },

            250

        );

        /*==============================
            MOSTRAR PAGINA
        ==============================*/

        setTimeout(

            ()=>{

                document.body.classList.add(

                    "pagina-cargada"

                );

                document.body.style.overflow =

                "auto";

            },

            650

        );

        /*==============================
            ELIMINAR BIENVENIDA
        ==============================*/

        setTimeout(

            ()=>{

                bienvenida.remove();

            },

            1100

        );

    }

);