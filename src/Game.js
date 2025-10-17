class Game {
    #username;
    #vida;
    #energia;
    #ki;
    #semillas;
    
    constructor(username) {
        this.#username = username;
        this.#vida = 1000;
        this.#energia = 1000;
        this.#ki = 1000;
        this.#semillas = 3;  // ← AGREGADO: Cada jugador inicia con 3 semillas
        this.mostrar_stats();
    }
    
    /* metodo encargado de mostrar las estadisticas del jugador */
    mostrar_stats(){
        /* imprime la vida actual de player */
        console.log(`
            username : ${this.#username},
            vida : ${this.#vida},
            energia : ${this.#energia},
            ki : ${this.#ki},
            semillas : ${this.#semillas}
            `);
    }

    getVida(){
        return this.#vida;
    }

    getEnergia(){
        return this.#energia;
    }

    getKi(){
        return this.#ki;
    }

    // ← AGREGADO: Método para obtener semillas
    getSemilla(){
        return this.#semillas;
    }

    // ← AGREGADO: Método para usar semilla del ermitaño
    usar_semilla(player){
        if(this.#semillas > 0){
            this.#semillas--;
            this.#vida = 1000;
            this.#energia = 1000;
            this.#ki = 1000;
            this.mostrar_stats();
        }
    }

    // ← AGREGADO: Método para cargar ki
    cargar(){
        this.#ki = this.#ki + 200 <= 1000 ? this.#ki + 200 : 1000;
        this.mostrar_stats();
    }

    /* metodo encargado de decrementar la vida del jugador */
    decremento_vida(){
        /* se valida que el decremento de vida sea un numero positivo mayor a cero */
        this.#vida = this.#vida - 175 >= 0 ? this.#vida - 175 : 0;
        /* al aplicar el decremento se muestran los stacks actualizados */
        this.mostrar_stats();
    }

    decremento_vida_atk_especial(){
        /* se valida que el decremento de vida sea un numero positivo mayor a cero */
        this.#vida = this.#vida - 400 >= 0 ? this.#vida - 400 : 0;
        /* al aplicar el decremento se muestran los stacks actualizados */
        this.mostrar_stats();
    }
    
    /* resta energía y ki del personaje que esta atacando y recibe como argumento un objeto correspondiente
    al jugador opuesto, esto para acceder al metodo decremento_vida y reducir sus stacks */
    atk_basico(player){
        this.#energia = this.#energia - 150 >= 0 ? this.#energia - 150 : 0;
        this.#ki = this.#ki - 200 >= 0 ? this.#ki - 200 : 0;
        /* decremento de vida del jugador opuesto */
        player.decremento_vida();
    }

    atk_especial(player){
        this.#energia = this.#energia - 400 >= 0 ? this.#energia - 400 : 0;
        this.#ki = this.#ki - 500 >= 0 ? this.#ki - 500 : 0;
        /* decremento de vida del jugador opuesto */
        player.decremento_vida_atk_especial();
    }

}

export default Game;