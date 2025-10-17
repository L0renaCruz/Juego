import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';

import Game from './Game.js';
import Swal from 'sweetalert2';

let player1 = "";
let player2 = "";

let personaje1 = "";
let personaje2 = "";

let victoriaspy1 = 0;
let victoriaspy2 = 0;

let turno = 1;

let btn_py1 = document.getElementById("btn_py1");
let btn_py2 = document.getElementById("btn_py2");

let seleccion1 = document.getElementById("seleccion_personaje1");
let seleccion2 = document.getElementById("seleccion_personaje2");

let atk_basico1 = document.getElementById("btn_atk_basico1");
let atk_especial1 = document.getElementById("btn_atk_especial1");
let cargar1 = document.getElementById("btn_cargar1");
let curar1 = document.getElementById("btn_curar1");

let atk_basico2 = document.getElementById("btn_atk_basico2");
let atk_especial2 = document.getElementById("btn_atk_especial2");
let carga2 = document.getElementById("btn_cargar2");
let curar2 = document.getElementById("btn_curar2");

const fondosBatalla = [
  "public/img/fondo/fondo1.jpg",
  "public/img/fondo/fondo2.jpg",
  "public/img/fondo/fondo3.jpg",
  "public/img/fondo/fondo4.jpg",
  "public/img/fondo/fondo5.png"
];

const cambiarFondoAleatorio = () => {
    let fondoAleatorio = fondosBatalla[Math.floor(Math.random() * fondosBatalla.length)];
    document.body.style.backgroundImage = `url('${fondoAleatorio}')`;
}

const accionesPersonaje = {
    "Cell": {
        "basico": {
            img: "Cell/basico.png",
            msj: "Muere insecto!",
            color: `rgba(120, 137, 13, 0.45)`
        },
        "especial": {
            img: "Cell/especial.png",
            msj: "Volare todo alv!",
            color: `rgba(126, 9, 9, 0.45)`
        },
        "semilla": {
            img: "Cell/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(163, 185, 15, 0.45)`
        },
        "ki": {
            img: "Cell/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(221, 255, 0, 0.45)`
        }
    },
    "Gogetta": {
        "basico": {
            img: "Gogetta/basico.png",
            msj: "Yo no soy ni Goku, ni Vegeta\nSoy el encargado de acabar contigo!",
            color: `rgba(43, 29, 199, 0.45)`
        },
        "especial": {
            img: "Gogetta/especial.png",
            msj: "Bingbang-Kamehameha!",
            color: `rgba(67, 127, 246, 0.45)`
        },
        "semilla": {
            img: "Gogetta/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(111, 108, 255, 0.45)`
        },
        "ki": {
            img: "Gogetta/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(20, 13, 141, 0.45)`
        }
    },
    "Gohan": {
        "basico": {
            img: "Gohan/basico.png",
            msj: "Soy el gran sayaman!",
            color: `rgba(145, 153, 97, 0.45)`
        },
        "especial": {
            img: "Gohan/especial.png",
            msj: "No te perdonare!",
            color: `rgba(92, 206, 223, 0.45)`
        },
        "semilla": {
            img: "Gohan/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(14, 135, 47, 0.45)`
        },
        "ki": {
            img: "Gohan/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(0, 251, 255, 0.45)`
        }
    },
    "Goku": {
        "basico": {
            img: "Goku/basico.png",
            msj: "Eres un estupido!",
            color: `rgba(17, 0, 255, 0.45)`
        },
        "especial": {
            img: "Goku/especial.png",
            msj: "Este es el ataque de todos\nMuere!",
            color: `rgba(0, 251, 255, 0.45)`
        },
        "semilla": {
            img: "Goku/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(0, 251, 255, 0.45)`
        },
        "ki": {
            img: "Goku/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(4, 0, 255, 0.45)`
        }
    },
    "Piccolo": {
        "basico": {
            img: "Piccolo/basico.png",
            msj: "Solo eres una savandija!",
            color: `rgba(221, 255, 0, 0.45)`
        },
        "especial": {
            img: "Piccolo/especial.png",
            msj: "Muere escoria!",
            color: `rgba(255, 0, 0, 0.45)`
        },
        "semilla": {
            img: "Piccolo/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(125, 139, 35, 0.45)`
        },
        "ki": {
            img: "Piccolo/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(196, 96, 19, 0.45)`
        }
    },
    "Trunks": {
        "basico": {
            img: "Trunks/basico.png",
            msj: "Acabere contigo!",
            color: `rgba(255, 251, 0, 0.45)`
        },
        "especial": {
            img: "Trunks/especial.png",
            msj: "Con esto cambiare mi futuro!",
            color: `rgba(0, 170, 255, 0.45)`
        },
        "semilla": {
            img: "Trunks/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(225, 225, 2, 0.45)`
        },
        "ki": {
            img: "Trunks/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(0, 149, 255, 0.45)`
        }
    },
    "Vegeta": {
        "basico": {
            img: "Vegeta/basico.png",
            msj: "Eres solo un insecto!",
            color: `rgba(229, 215, 60, 0.45)`
        },
        "especial": {
            img: "Vegeta/especial.png",
            msj: "Resplandor Final!",
            color: `rgba(162, 0, 255, 0.45)`
        },
        "semilla": {
            img: "Vegeta/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(238, 255, 0, 0.45)`
        },
        "ki": {
            img: "Vegeta/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(0, 0, 255, 0.45)`
        }
    },
    "Vegetto": {
        "basico": {
            img: "Vegetto/basico.png",
            msj: "Estoy listo!",
            color: `rgba(0, 94, 255, 0.45)`
        },
        "especial": {
            img: "Vegetto/especial.png",
            msj: "Esto es un ataque\nBing bang!",
            color: `rgba(0, 242, 255, 0.45)`
        },
        "semilla": {
            img: "Vegetto/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(221, 130, 244, 0.45)`
        },
        "ki": {
            img: "Vegetto/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(0, 145, 255, 0.45)`
        }
    },
    "Moro": {
        "basico": {
            img: "Moro/basico.png",
            msj: "Muere!",
            color: `rgba(47, 49, 196, 0.45)`
        },
        "especial": {
            img: "Moro/especial.png",
            msj: "Muere con este odioso planeta!",
            color: `rgba(0, 110, 255, 0.45)`
        },
        "semilla": {
            img: "Moro/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(255, 255, 0, 0.45)`
        },
        "ki": {
            img: "Moro/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(241, 198, 7, 0.45)`
        }
    },
    "Black": {
        "basico": {
            img: "Black/basico.png",
            msj: "Prueba el poder de un Dios!",
            color: `rgba(243, 71, 208, 0.45)`
        },
        "especial": {
            img: "Black/especial.png",
            msj: "Este es un poder que ni yo conozco!",
            color: `rgba(212, 0, 255, 0.45)`
        },
        "semilla": {
            img: "Black/curar.png",
            msj: "He recuperado todo mi poder!",
            color: `rgba(214, 130, 244, 0.45)`
        },
        "ki": {
            img: "Black/energia.png",
            msj: "Aaaaaaah!",
            color: `rgba(221, 0, 255, 0.45)`
        }
    }
};

const alertaAtk = (personaje, accion) => {
    let timerInterval;
    Swal.fire({
        title: accionesPersonaje[personaje][accion].msj,
        imageUrl: `./public/img/${accionesPersonaje[personaje][accion].img}`,
        imageWidth: 500,
        imageHeight: 500,
        showCancelButton: false,
        showConfirmButton: false,
        background: "none",
        html: "<b></b>",
        backdrop: accionesPersonaje[personaje][accion].color,
        timer: 2000,
        willClose: () => {
            clearInterval(timerInterval);
        }
    });
};

const actualizarTurno = () => {
    const turnoJugador1 = turno === 1;
    // Botones jugador 1
    atk_basico1.disabled = !turnoJugador1;
    atk_especial1.disabled = !turnoJugador1;
    cargar1.disabled = !turnoJugador1;
    curar1.disabled = !turnoJugador1;

    // Botones jugador 2
    atk_basico2.disabled = turnoJugador1;
    atk_especial2.disabled = turnoJugador1;
    carga2.disabled = turnoJugador1;
    curar2.disabled = turnoJugador1;
}

const cambiarSeleccion = (botones, seleccionado, color) => {
    botones.forEach(btn => {
        if (seleccionado == btn.querySelector("img").title) {
            btn.classList.remove(color);
            btn.classList.add("btn-warning");
        } else {
            btn.classList.remove("btn-warning");
            btn.classList.add(color);
        }
    });
};

seleccion1.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (evento) => {
        cambiarSeleccion(seleccion1.querySelectorAll("button"), evento.target.title, "btn-danger");
        personaje1 = evento.target.title;
    });
});

seleccion2.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (evento) => {
        cambiarSeleccion(seleccion2.querySelectorAll("button"), evento.target.title, "btn-primary");
        personaje2 = evento.target.title;
    });
});

const mostrarBatalla = () => {
    if (player1 != "" && personaje1 != "" && player2 != "" && personaje2 != "") {
        document.getElementById("batalla").classList.remove("d-none");
        cambiarFondoAleatorio();
    }
};

const ocultarSeleccion1 = () => {
    if (player1 != "" && personaje1 != "") {
        document.getElementById("jugador1").classList.add("d-none");
        document.getElementById("nombre_personaje1").innerText = personaje1;
        mostrarBatalla();
    }
};

const ocultarSeleccion2 = () => {
    if (player2 != "" && personaje2 != "") {
        document.getElementById("jugador2").classList.add("d-none");
        document.getElementById("nombre_personaje2").innerText = personaje2;
        mostrarBatalla();
    }
};

const revancha = () => {
    player1 = new Game(player1.getUsername());
    player2 = new Game(player2.getUsername());

    document.getElementById("vida1").style.width = `${player1.getVida() / 10}%`;
    document.getElementById("vida1").innerText = `${player1.getVida()}`;
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;
    document.getElementById("semillas1").innerText = player1.getSemillas() < 3 ? 3 : player1.getSemillas();

    document.getElementById("vida2").style.width = `${player2.getVida() / 10}%`;
    document.getElementById("vida2").innerText = `${player2.getVida()}`;
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;
    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;
    document.getElementById("semillas2").innerText = player2.getSemillas() < 3 ? 3 : player2.getSemillas();
}

const mostrarSeleccion = () => {
    document.getElementById("batalla").classList.add("d-none");
    document.getElementById("jugador1").classList.remove("d-none");
    document.getElementById("jugador2").classList.remove("d-none");
    document.body.style.backgroundImage = "url('public/img/fondo/fondo.jpg')";
    revancha();
    player1 = "";
    player2 = "";
    personaje1 = "";
    personaje2 = "";
};

btn_py1.addEventListener("click", () => {
    let user_py1 = document.getElementById("username_py1").value;
    if (user_py1 != "") {
        player1 = new Game(user_py1);
        document.getElementById("username1").innerText = user_py1;
        document.getElementById("img_personaje1").src = `./public/img/${personaje1}/base.png`;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del jugador 1 no puede estar vacio'
        });
    }
    if (personaje1 == "") Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un personaje'
    });
    ocultarSeleccion1();
});

btn_py2.addEventListener("click", () => {
    let user_py2 = document.getElementById("username_py2").value;
    if (user_py2 != "") {
        player2 = new Game(user_py2);
        document.getElementById("username2").innerText = user_py2;
        document.getElementById("img_personaje2").src = `./public/img/${personaje2}/base.png`;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre del jugador 2 no puede estar vacio'
        });
    }
    if (personaje2 == "") Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un personaje'
    });
    ocultarSeleccion2();
});

document.getElementById("btn_atk_basico1").addEventListener("click", () => {
    if (player1.getEnergia() < 150 || player1.getKi() < 200) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes suficiente energia o ki para realizar este ataque'
        });
        return;
    }
    alertaAtk(personaje1, "basico");
    player1.atk_basico(player2);
    document.getElementById("vida2").style.width = `${player2.getVida() / 10}%`;
    document.getElementById("vida2").innerText = `${player2.getVida()}`;
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;

    turno = 2;
    actualizarTurno();

    if (player2.getVida() == 0) {
        Swal.fire({
            icon: 'info',
            title: 'Juego Terminado',
            text: `El ganador es ${player1.getUsername()}`,
            confirmButtonText: 'Revancha',
            cancelButtonText: 'Seleccionar nuevos jugadores',
            showCancelButton: true,
            showCloseButton: true,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                // reiniciar el juego
                victoriaspy1 = victoriaspy1 + 1;
                document.getElementById("victoriaspy1.1").innerText = victoriaspy1;
                document.getElementById("victoriaspy1.2").innerText = victoriaspy1;
                revancha();
                cambiarFondoAleatorio();
                return;
            } else {
                // reiniciar el juego
                victoriaspy1 = victoriaspy1 + 1;
                document.getElementById("victoriaspy1.1").innerText = victoriaspy1;
                document.getElementById("victoriaspy1.2").innerText = victoriaspy1;
                mostrarSeleccion();
                return;
            }
            // reiniciar el juego
            return;
        });

    }
});

document.getElementById("btn_atk_basico2").addEventListener("click", () => {
    if (player2.getEnergia() < 150 || player2.getKi() < 200) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes suficiente energia o ki para realizar este ataque'
        });
        return;
    }
    alertaAtk(personaje2, "basico");
    player2.atk_basico(player1);
    document.getElementById("vida1").style.width = `${player1.getVida() / 10}%`;
    document.getElementById("vida1").innerText = `${player1.getVida()}`;
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;
    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;
    turno = 1;
    actualizarTurno();

    if (player1.getVida() == 0) {
        Swal.fire({
            icon: 'info',
            title: 'Juego Terminado',
            text: `El ganador es ${player2.getUsername()}`,
            confirmButtonText: 'Revancha',
            cancelButtonText: 'Seleccionar nuevos jugadores',
            showCancelButton: true,
            showCloseButton: true,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                // reiniciar el juego
                victoriaspy2 = victoriaspy2 + 1;
                document.getElementById("victoriaspy2.1").innerText = victoriaspy2;
                document.getElementById("victoriaspy2.2").innerText = victoriaspy2;
                revancha();
                cambiarFondoAleatorio();
                return;
            } else {
                // reiniciar el juego
                victoriaspy2 = victoriaspy2 + 1;
                document.getElementById("victoriaspy2.1").innerText = victoriaspy2;
                document.getElementById("victoriaspy2.2").innerText = victoriaspy2;
                mostrarSeleccion();
                return;
            }
            // reiniciar el juego
            return;
        });
    }

});

document.getElementById("btn_atk_especial1").addEventListener("click", () => {
    if (player1.getEnergia() < 400 || player1.getKi() < 500) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes suficiente energia o ki para realizar este ataque'
        });
        return;
    }
    alertaAtk(personaje1, "especial");
    player1.atk_especial(player2);
    document.getElementById("vida2").style.width = `${player2.getVida() / 10}%`;
    document.getElementById("vida2").innerText = `${player2.getVida()}`;
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;

    turno = 2;
    actualizarTurno();

    if (player2.getVida() == 0) {
        Swal.fire({
            icon: 'info',
            title: 'Juego Terminado',
            text: `El ganador es ${player1.getUsername()}`,
            confirmButtonText: 'Revancha',
            cancelButtonText: 'Seleccionar nuevos jugadores',
            showCancelButton: true,
            showCloseButton: true,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                // reiniciar el juego
                victoriaspy1 = victoriaspy1 + 1;
                document.getElementById("victoriaspy1.1").innerText = victoriaspy1;
                document.getElementById("victoriaspy1.2").innerText = victoriaspy1;
                revancha();
                cambiarFondoAleatorio();
                return;
            } else {
                // reiniciar el juego
                victoriaspy1 = victoriaspy1 + 1;
                document.getElementById("victoriaspy1.1").innerText = victoriaspy1;
                document.getElementById("victoriaspy1.2").innerText = victoriaspy1;
                mostrarSeleccion();
                return;
            }
            // reiniciar el juego
            return;
        });
    }
});

document.getElementById("btn_atk_especial2").addEventListener("click", () => {
    if (player2.getEnergia() < 400 || player2.getKi() < 500) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes suficiente energia o ki para realizar este ataque'
        });
        return;
    }
    alertaAtk(personaje2, "especial");
    player2.atk_especial(player1);
    document.getElementById("vida1").style.width = `${player1.getVida() / 10}%`;
    document.getElementById("vida1").innerText = `${player1.getVida()}`;
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;
    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;

    turno = 1;
    actualizarTurno();

    if (player1.getVida() == 0) {
        Swal.fire({
            icon: 'info',
            title: 'Juego Terminado',
            text: `El ganador es ${player2.getUsername()}`,
            confirmButtonText: 'Revancha',
            cancelButtonText: 'Seleccionar nuevos jugadores',
            showCancelButton: true,
            showCloseButton: true,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                // reiniciar el juego
                victoriaspy2 = victoriaspy2 + 1;
                document.getElementById("victoriaspy2.1").innerText = victoriaspy2;
                document.getElementById("victoriaspy2.2").innerText = victoriaspy2;
                revancha();
                cambiarFondoAleatorio();
                return;
            } else {
                // reiniciar el juego
                victoriaspy2 = victoriaspy2 + 1;
                document.getElementById("victoriaspy2.1").innerText = victoriaspy2;
                document.getElementById("victoriaspy2.2").innerText = victoriaspy2;
                mostrarSeleccion();
                return;
            }
            // reiniciar el juego
            return;
        });
    }

});

document.getElementById("btn_cargar1").addEventListener("click", () => {
    if (player1.getEnergia() == 1000 && player1.getKi() == 1000) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu energia y ki ya estan al maximo'
        });
        return;
    }
    alertaAtk(personaje1, "ki");
    player1.cargar();
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;

    turno = 2;
    actualizarTurno();
});

document.getElementById("btn_cargar2").addEventListener("click", () => {
    if (player2.getEnergia() == 1000 && player2.getKi() == 1000) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu energia y ki ya estan al maximo'
        });
        return;
    }
    alertaAtk(personaje2, "ki");
    player2.cargar();
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;
    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;

    turno = 1;
    actualizarTurno();
});

document.getElementById("btn_curar1").addEventListener("click", () => {
    if (player1.getVida() == 1000 && player1.getEnergia() == 1000 && player1.getKi() == 1000) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu vida, energia y ki ya estan al maximo'
        });
        return;
    }

    if (player1.getSemillas() > 0) {
        alertaAtk(personaje1, "semilla");
        player1.usar_semilla(player1);
        document.getElementById("semillas1").innerText = player1.getSemillas();
    } else {
        return;
    }
    document.getElementById("vida1").style.width = `${player1.getVida() / 10}%`;
    document.getElementById("vida1").innerText = `${player1.getVida()}`;
    document.getElementById("energia1").style.width = `${player1.getEnergia() / 10}%`;
    document.getElementById("energia1").innerText = `${player1.getEnergia()}`;
    document.getElementById("ki1").style.width = `${player1.getKi() / 10}%`;
    document.getElementById("ki1").innerText = `${player1.getKi()}`;

    turno = 2;
    actualizarTurno();
});

document.getElementById("btn_curar2").addEventListener("click", () => {
    if (player2.getVida() == 1000 && player2.getEnergia() == 1000 && player2.getKi() == 1000) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu vida, energia y ki ya estan al maximo'
        });
        return;
    }

    if (player2.getSemillas() > 0) {
        alertaAtk(personaje2, "semilla");
        player2.usar_semilla(player2);
        document.getElementById("semillas2").innerText = player2.getSemillas();
    } else {
        return;
    }
    document.getElementById("vida2").style.width = `${player2.getVida() / 10}%`;
    document.getElementById("vida2").innerText = `${player2.getVida()}`;
    document.getElementById("energia2").style.width = `${player2.getEnergia() / 10}%`;
    document.getElementById("energia2").innerText = `${player2.getEnergia()}`;
    document.getElementById("ki2").style.width = `${player2.getKi() / 10}%`;
    document.getElementById("ki2").innerText = `${player2.getKi()}`;

    turno = 1;
    actualizarTurno();
});
