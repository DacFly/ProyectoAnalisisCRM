var contenidoTablaResultado = document.querySelector("#resultados");

var modalCrearVenta = new bootstrap.Modal(document.getElementById('modalCrearVenta'));

const input = document.getElementById("inputCodFactura");

function cargarVentas() {
  fetch("https://localhost:7203/Venta/listaVentas", {
    method: "GET",
  })
    .then((ventas) => ventas.json())
    .then((jsonVentas) => {
      contenidoTablaResultado.innerHTML = ``;
      console.log(jsonVentas);
      for (const venta of jsonVentas) {
        contenidoTablaResultado.innerHTML += `
          <tr class="table-primary">
            <td>${venta.codFactura}</td>
            <td>${venta.nombreCliente}</td>
            <td>${venta.cedulaCliente}</td>
            <td>${venta.nombreProducto}</td>
            <td>${venta.cantidadProducto}</td>
            <td>${venta.subtotal}</td>
            <td>${venta.iva}</td>
            <td>${venta.montoTotal}</td>
            <td>${venta.fechaVenta}</td>
            <td>
              <a name="" id="" class="btn btn-info" onclick="editar(${venta.codFactura},'${venta.nombreCliente}','${venta.cedulaCliente}','${venta.nombreProducto}',${venta.cantidadProducto},${venta.subtotal},${venta.iva},${venta.montoTotal},'${venta.fechaVenta}')" role="button">Editar</a>
              <a name="" id="" class="btn btn-danger" onclick="eliminar(${venta.codFactura})" role="button">Eliminar</a>
            </td>
          </tr>`;
      }
    })
    .catch((error) => {
      // Manejar errores de solicitud aquí
      console.error(error);
    });
}

cargarVentas();
  
  // Agrega un listener de eventos al input
input.addEventListener("input", function () {
    if (input.value != "") {
      fetch("https://localhost:7203/Venta/BuscarVenta/" + input.value, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((venta) => {
          contenidoTablaResultado.innerHTML = ``;
          console.log(venta);
          if (venta !== null) {
            contenidoTablaResultado.innerHTML += `
              <tr class="table-primary">
                <td>${venta.codFactura}</td>
                <td>${venta.nombre}</td>
                <td>${venta.cedula}</td>
                <td>${venta.NombreProducto}</td>
                <td>${venta.CodProducto}</td>
                <td>${venta.subTotal}</td>
                <td>${venta.iva}</td>
                <td>${venta.montoTotal}</td>
                <td>${venta.fechaVenta}</td>
                <td>
                  <a name="" id="" class="btn btn-info" onclick="editar(${venta.codFactura},'${venta.nombre}', '${venta.cedula}','${venta.NombreProducto}','${venta.CodProducto}', ${venta.subTotal}, ${venta.iva}, ${venta.montoTotal}, '${venta.fechaVenta}')" role="button">Editar</a>
                  <a name="" id="" class="btn btn-danger" onclick="eliminar(${venta.codFactura})" role="button">Eliminar</a>
                </td>
              </tr>`;
          } else {
            // La venta no se encontró
            contenidoTablaResultado.innerHTML = "Venta no encontrada";
          }
        })
        .catch((error) => {
          // Aquí puedes manejar los errores de la solicitud
          console.error(error);
        });
    } else {
      cargarVentas();
    }
  });
  

// Obtener lista de clientes y llenar el dropdown
function cargarClientes() {
  fetch("https://localhost:7203/Venta/ListaClientes", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((clientes) => {
      const selectCliente = document.getElementById("selectCliente");
      selectCliente.innerHTML = '<option value="">Selecciona un cliente</option>';
      clientes.forEach((cliente) => {
        const option = document.createElement("option");
        option.value = cliente.clienteId;
        option.textContent = cliente.nombre;
        selectCliente.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// Obtener lista de productos y llenar el dropdown
function cargarProductos() {
  fetch("https://localhost:7203/Venta/ListaProductos", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((productos) => {
      const selectProducto = document.getElementById("producto");
      selectProducto.innerHTML = '<option value="">Selecciona un producto</option>';
      productos.forEach((producto) => {
        const option = document.createElement("option");
        option.value = producto.productoId;
        option.textContent = producto.nombreProducto;
        selectProducto.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function seleccionarCliente() {
  const selectCliente = document.getElementById("selectCliente");
  const cedulaInput = document.getElementById("cedula");

  // Obtener el cliente seleccionado
  const selectedClienteId = selectCliente.value;

  
  // Hacer una solicitud para obtener los detalles del cliente
  fetch(`https://localhost:7203/Venta/ListaClientes/${selectedClienteId}`, {
    method: "GET",
})

    .then((response) => response.json())
    .then((cliente) => {
      console.log(cliente);  // Verifica la respuesta del servidor
      // Actualizar el campo de cédula con el valor del cliente
      cedulaInput.value = cliente.cedula;  // Asegúrate de usar el campo correcto
    })
    .catch((error) => {
      console.error(error);
    });
}

function seleccionarProducto() {
  const selectProducto = document.getElementById("producto");
  const subTotalInput = document.getElementById("subTotal");
  const cantidadSelect = document.getElementById("cantidad");
  const ivaInput = document.getElementById("iva");
  const montoTotalInput = document.getElementById("montoTotal");

  // Obtener el producto seleccionado
  const selectedProductoId = selectProducto.value;

  // Hacer una solicitud para obtener los detalles del producto, incluyendo precioProducto y cantidad disponible
  fetch(`https://localhost:7203/Venta/ListaProductos/${selectedProductoId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((producto) => {
      console.log(producto);  // Verifica la respuesta del servidor

      // Verificar si las propiedades precioProducto y cantidad están definidas y no son null
      if (producto.hasOwnProperty('precioProducto') && producto.precioProducto !== null &&
          producto.hasOwnProperty('cantidad') && producto.cantidad !== null) {
        // Actualizar el campo de subTotal con el valor del precio del producto
        subTotalInput.value = producto.precioProducto;

        // Limpiar opciones actuales
        cantidadSelect.innerHTML = "";

        // Agregar opciones al select basado en la cantidad disponible del producto
        for (let i = 1; i <= producto.cantidad; i++) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          cantidadSelect.appendChild(option);
        }

        // Agregar un listener de eventos al campo de cantidad para manejar cambios en tiempo real
        cantidadSelect.addEventListener("input", function () {
          // Obtener la cantidad seleccionada
          const selectedCantidad = parseInt(cantidadSelect.value, 10);

          // Calcular el monto total
          const montoTotal = selectedCantidad * producto.precioProducto;

          // Calcular el IVA (13% del monto total)
          const iva = 0.13 * montoTotal;

          // Actualizar los campos de IVA y monto total
          ivaInput.value = iva.toFixed(2);  // Ajustar a dos decimales
          montoTotalInput.value = montoTotal.toFixed(2);  // Ajustar a dos decimales
        });
      } else {
        // Manejar el caso donde precioProducto o cantidad no están definidos o son null
        console.error('El valor de precioProducto o cantidad no está definido o es null en la respuesta de la API.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
  
// equis de equis de 
function mostrarModalCrearVenta() {
  cargarClientes();
  cargarProductos();
  modalCrearVenta.show();
}
// equis de equis de 
function cerrarModalCrearVenta() {
  $('#cedula').val('');
  $('#subTotal').val('');
  modalCrearVenta.hide();
}
// equis de equis de 