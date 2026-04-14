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
    const data = fs.readFileSync(archivoJSON);
    this.#carta = JSON.parse(data);

    this.#precioMenu = precioMenu;
  }

  // metodo para mostrar mesas
  mostrarMesas() {
    console.log("Estado de las mesas: ");

    this.#mesas.forEach((m, index) => {
      const estado = m.estaLibre() ? "Libre" : "Ocupado";
      const numConsumaciones = m.getConsumiciones().length;
      console.log(
        `Mesa ${index + 1}- ${estado}` +
          (estado === "Ocupado" ? `(${numConsumaciones} consumaciones)` : ""),
      );
    });
  }

  // Buscar una mesa libre y ocupar la
  buscarMesaLibre() {
    for (let i = 0; i < this.#mesas.length; i++) {
      if (this.#mesas[i].estaLibre()) {
        this.#mesas[i].ocupar();
        console.log(`Mesa ${i + 1} asignada.`);
        return i;
      }
    }
  }

  // mesas ocupadas
  getMesasOcupadad() {
    return this.#mesas
      .map((mesa, index) => ({ mesa, index }))
      .filter((obj) => !obj.mesa.estaLibre());
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
}

module.exports = Restaurante;
