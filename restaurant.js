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
      .map((mesa, numero) => ({ numero, mesa }))
      .filter((obj) => !obj.mesa.estaLibre());
  }
  // metodo para mostrar mesas
  mostrarMesas() {
    const ocupadas = this.getMesasOcupadad();
    if (ocupadas.length === 0) {
      console.log("No hay mesas ocupadas");
      return;
    }
    ocupadas.forEach((obj) => {
      console.log(`Mesa ${obj.numero}: `);
      obj.mesa.mostrarConsumaciones();
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
  getTotal(mesa) {
    const consumiciones = mesa.getConsumiciones();
    // crear listas para cada tipo
    let primeros = consumiciones.filter((item) => item.tipo === "primero");
    let segundos = consumiciones.filter((item) => item.tipo === "segundo");
    let postres = consumiciones.filter((item) => item.tipo === "postre");
    let bebidas = consumiciones.filter((item) => item.tipo === "bebida");

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
    mesa.liberar();
    return total;
  }
}

module.exports = Restaurante;
