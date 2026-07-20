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

    async ()=>{

        /*==============================
                EVITAR DOBLE CLIC
        ==============================*/

        boton.disabled = true;

        /*==============================
                ANIMACION BOTON
        ==============================*/

        boton.classList.add(

            "presionado"

        );

        /*==============================
            REPRODUCIR MUSICA
        ==============================*/

        try{

            await reproducir();

        }

        catch(error){

            console.error(error);

        }

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