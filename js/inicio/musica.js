const audio = document.getElementById("audio");

const play = document.getElementById("play");

let reproduciendo = false;

play.addEventListener("click", () => {

    if(!reproduciendo){

        audio.play();

        play.innerHTML = "❚❚";

        reproduciendo = true;

    }

    else{

        audio.pause();

        play.innerHTML = "▶";

        reproduciendo = false;

    }

});