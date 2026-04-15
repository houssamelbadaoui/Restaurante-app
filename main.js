const readline = require("readline/promises");
const { stdin, stdout } = require("process");
const Restaurante = require("./restaurant");

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const restaurant = new Restaurante(5, "./carta.json", 15);

// Menu principal

async function menuPrincipal() {
  do {
    console.log("Menu Principal: ");
    console.log("1. Mostrar mesas");
    console.log("2. Buscar Mesa vacia");
    console.log("3. Seleccionar Mesa");
    console.log("4. Salir");

    const opcion = await rl.question("Choose an option: ");

    switch (opcion) {
      case "1":
        restaurant.mostrarMesas();
        break;
      case "2":
        restaurant.buscarMesaLibre();
        break;
      case "3":
        await seleccionarMesa();
        break;
      default:
        console.log("Not valid option.");
    }
  } while (opcion != "4");
  rl.close();
}

// helper function para seleccionar a una mesa
async function seleccionarMesa() {
  const mesasOcupadas = restaurant.getMesasOcupadad();

  // validar si hay mesas que no son ocupadas
  if (mesasOcupadas.length === 0) {
    console.log("No hay mesas ocupadas.");
    return;
  }

  console.log("Mesas Ocupadas: ");
  mesasOcupadas.forEach((mesa) => {
    console.log(`Mesa ${mesa.index + 1}`);
  });

  const opcion = await rl.question("Selecciona numero de mesa: ");
  const index = Number(opcion) - 1;

  const mesa = restaurant.seleccionarMesa(index);

  if (mesa) {
    await menuMesa(mesa, index);
  }
}
