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
  let opcion;
  do {
    console.log("Menu Principal: ");
    console.log("1. Mostrar mesas");
    console.log("2. Buscar Mesa vacia");
    console.log("3. Seleccionar Mesa");
    console.log("4. Salir");

    opcion = await rl.question("Choose an option: ");

    switch (opcion) {
      case "1":
        restaurant.mostrarMesas();
        break;
      case "2":
        const mesa = restaurant.buscarMesaLibre();
        if (mesa) {
          await menuMesa(mesa);
        }
        break;
      case "3":
        await seleccionarMesa();
        break;
      default:
        console.log("Not valid option.");
    }
  } while (opcion !== "4");
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
    await menuMesa(mesa);
  }
}

// Menu de Mesa
async function menuMesa(mesa) {
  let opcion;
  do {
    console.log("Menu de Mesa: ");
    console.log("1. Pedir consumacion");
    console.log("2. Pedir Cuenta");
    console.log("3. Volver");

    opcion = await rl.question("Choose an option: ");
    switch (opcion) {
      case "1":
        await pedirConsumacion(mesa);
        break;
      case "2":
        const total = restaurant.getTotal(mesa);
        console.log(`Total a pagar: ${total}$`);
        break;
      case "3":
        return;
      default:
        console.log("Opcion Invalida.");
    }
  } while (opcion !== "3");
}

// Helper function: pedirConsumacion()

async function pedirConsumacion(mesa) {
  const carta = restaurant.getCarta();

  console.log("Carta: ");
  carta.forEach((c) => {
    console.log(
      `Item numero ${c.id}. Nombre: ${c.nombre} - tipo: ${c.tipo} - Precio: ${c.precio}$`,
    );
  });

  const opcion = await rl.question("Elige tu consumacion: ");
  const id = Number(opcion);

  const item = carta.find((c) => c.id === id);

  if (!item) {
    console.log("Consumacion no valida, Ententa otra ves");
    return;
  }

  mesa.agregarConsumiciones(item);
  console.log(`${item.nombre} añadido`);
}

menuPrincipal();
