class Reproductor {

    constructor() {

        this.audio = document.getElementById("audio");

        this.indice = 0;

        this.playlist = PLAYLIST;

        this.inicializado = false;

    }

    iniciar() {

        const cancion = this.playlist[this.indice];

        this.audio.src = cancion.archivo;

        this.audio.load();

        this.inicializado = true;

    }

    async reproducir() {

        if (!this.inicializado) {

            this.iniciar();

        }

        try {

            await this.audio.play();

        }

        catch (error) {

            console.error("Error al reproducir:", error);

        }

    }

}

const player = new Reproductor();