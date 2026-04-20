class Mesa {
  // private atributes
  #consumiciones;
  #libre;
  constructor() {
    this.#consumiciones = [];
    this.#libre = true;
  }

  // metodo para ocupar a una mesa
  ocupar() {
    // validamos que ya no esta ocupada
    if (!this.#libre) {
      console.log("Mesa ya esta ocupada.");
      return;
    }
    this.#libre = false;
  }

  // metodo para liberar mesa
  liberar() {
    this.#libre = false;
    this.#consumiciones = [];
  }

  // metodo para ver si la mesa esta libre or ocupada
  estaLibre() {
    return this.#libre;
  }
  // metodo para añadir un item a la lista de consumiciones
  agregarConsumiciones(item) {
    // validate if la mesa esta libre
    if (this.#libre) {
      // if yes we show a message and stop
      console.log("La mesa esta libre, Primero debes ocuparla.");
      return;
    }
    this.#consumiciones.push(item);
  }

  // metodo para ver la lista de consumicions
  getConsumiciones() {
    return this.#consumiciones;
  }

  // Mostrar las consumaciones de forma bonita
  mostrarConsumaciones() {
    // if la lista is empty
    if (this.#consumiciones.length === 0) {
      console.log("No hay consumaciones");
      return;
    }
    console.log("Consumaciones: ");
    this.#consumiciones.forEach((c, index) => {
      console.log(
        `${index + 1}. Nombre: ${c.nombre} - tipo: (${c.tipo} - Precio: ${c.precio}$)`,
      );
    });
  }
}
module.exports = Mesa;
