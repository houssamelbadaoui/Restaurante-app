const fs = require("fs");
const Mesa = require("./mesa");
class Restaurante {
  #mesas;
  #carta;
  #precioMenu;
  constructor(numMesas, archivoJSON, precioMenu) {
    this.#mesas = [];
    // añadimos numMesas de mesas en la lista
    for (let i = 1; i <= numMesas; i++) {
      this.#mesas.push(new Mesa());
    }

    // leemos el archivo json y lo guardamos en la carta
    this.#carta = JSON.parse(fs.readFileSync(archivoJSON));

    this.#precioMenu = precioMenu;
  }

  // mesas ocupadas
  getMesasOcupadad() {
    return this.#mesas
      .map((mesa, index) => ({ mesa, index }))
      .filter((obj) => !obj.mesa.estaLibre());
  }
  // metodo para mostrar mesas
  mostrarMesas() {
    const ocupadas = this.getMesasOcupadad();
    ocupadas.forEach((obj) => {
      console.log(`${obj}: ${obj.mesa.mostrarConsumaciones()}`);
    });
  }

  // Buscar una mesa libre y ocupar la
  buscarMesaLibre() {
    const mesa = this.#mesas.find((m) => m.estaLibre());
    if (!mesa) {
      console.log("No hay mesas vacias.");
      return;
    }
    mesa.ocupar();
    console.log("Mesa asignada");
    return mesa;
  }

  // seleccionar una mesa
  seleccionarMesa(index) {
    if (index < 0 || index > this.#mesas.length) {
      console.log("Indice invalido.");
      return null;
    }
    if (this.#mesas[index].estaLibre()) {
      console.log("Mesa esta libre");
      return null;
    }
    return this.#mesas[index];
  }

  getCarta() {
    return this.#carta;
  }

  getPrecioMenu() {
    return this.#precioMenu;
  }

  // metodo para pagar, que devuelve el total para pagar
  getTotal() {
    // crear listas para cada tipo
    const primeros = this.#carta.find((item) => item.tipo === "primero");
    const segundos = this.#carta.find((item) => item.tipo === "segundo");
    const postres = this.#carta.find((item) => item.tipo === "postre");
    const bebidas = this.#carta.find((item) => item.tipo === "bebida");

    // calculamos cuantos menus podemos haced
    const menus = Math.min(
      primeros.length,
      segundos.length,
      postres.length,
      bebidas.length,
    );

    // ahora creamos un nuevo array con item que no entran al los menus: restantes
    const restantes = [
      ...primeros.slice(menus),
      ...segundos.slice(menus),
      ...postres.slice(menus),
      ...bebidas.slice(menus),
    ];

    let total = menus * this.#precioMenu;
    restantes.forEach((item) => {
      total += item.precio;
    });
    return total;
  }
}

module.exports = Restaurante;
