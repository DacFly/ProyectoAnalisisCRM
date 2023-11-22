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
              <a name="" id="" class="btn btn-secondary" onclick="imprimirPdf(${venta.codFactura},'${venta.nombreCliente}','${venta.cedulaCliente}','${venta.nombreProducto}',${venta.cantidadProducto},${venta.subtotal},${venta.iva},${venta.montoTotal},'${venta.fechaVenta}')" role="button">Imprimir</a>
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


input.addEventListener("input", function () {
  if (input.value != "") {
    fetch("https://localhost:7203/Venta/BuscarVenta/" + input.value, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error('La venta no fue encontrada');
        }
        if (!response.ok) {
          throw new Error('Error al buscar la venta. Código de estado: ' + response.status);
        }
        return response.json();
      })
      .then((ventas) => {
        contenidoTablaResultado.innerHTML = ``;
        console.log(ventas);

        if (Array.isArray(ventas)) {
          if (ventas.length > 0) {
            for (const venta of ventas) {
              contenidoTablaResultado.innerHTML += `
  <tr class="table-primary">
    <td>${venta.codFactura}</td>
    <td>${venta.nombreCliente}</td>
    <td>${venta.cedulaCliente}</td>
    <td>${venta.nombreProducto}</td>
    <td>${venta.cantidadProducto}</td>
    <td>${venta.productoId}</td>
    <td>${venta.subtotal}</td>
    <td>${venta.iva}</td>
    <td>${venta.montoTotal}</td>
    <td>${venta.fechaVenta}</td>
    <td>
    <a name="" id="" class="btn btn-info" onclick="editar(${venta.codFactura},'${venta.nombreCliente}','${venta.cedulaCliente}','${venta.nombreProducto}',${venta.cantidadProducto},${venta.subtotal},${venta.iva},${venta.montoTotal},'${venta.fechaVenta}')" role="button">Editar</a>
    <a name="" id="" class="btn btn-danger" onclick="eliminar(${venta.codFactura})" role="button">Eliminar</a>
    <a name="" id="" class="btn btn-secondary" onclick="imprimirPdf(${venta.codFactura},'${venta.nombreCliente}','${venta.cedulaCliente}','${venta.nombreProducto}',${venta.cantidadProducto},${venta.subtotal},${venta.iva},${venta.montoTotal},'${venta.fechaVenta}')" role="button">Imprimir</a>
      </td>
  </tr>`;
            }
          } else {
            // No se encontraron ventas
            contenidoTablaResultado.innerHTML = "Venta no encontrada";
          }
        } else if (typeof ventas === 'object') {
          // Si la respuesta es un objeto, trata de mostrar esa venta
          contenidoTablaResultado.innerHTML += `
  <tr class="table-primary">
    <td>${ventas.codFactura}</td>
    <td>${ventas.nombreCliente}</td>
    <td>${ventas.cedulaCliente}</td>
    <td>${ventas.nombreProducto}</td>
    <td>${ventas.cantidadProducto}</td>
    <td>${ventas.productoId}</td>
    <td>${ventas.subtotal}</td>
    <td>${ventas.iva}</td>
    <td>${ventas.montoTotal}</td>
    <td>${ventas.fechaVenta}</td>
    <td>
      <a name="" id="" class="btn btn-info" onclick="editar(${ventas.codFactura},'${ventas.nombreCliente}', '${ventas.cedulaCliente}','${ventas.nombreProducto}',${ventas.cantidadProducto},'${ventas.productoId}', ${ventas.subtotal}, ${ventas.iva}, ${ventas.montoTotal}, '${ventas.fechaVenta}')" role="button">Editar</a>
      <a name="" id="" class="btn btn-danger" onclick="eliminar(${ventas.codFactura})" role="button">Eliminar</a>
      <a name="" id="" class="btn btn-secondary" onclick="imprimirPdf(${ventas.codFactura},'${ventas.nombreCliente}','${ventas.cedulaCliente}','${ventas.nombreProducto}',${ventas.cantidadProducto},${ventas.subtotal},${ventas.iva},${ventas.montoTotal},'${ventas.fechaVenta}')" role="button">Imprimir</a>
    </td>
  </tr>`;
        }
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error('Error al procesar la respuesta de la API:', error);
        contenidoTablaResultado.innerHTML = error.message; // Mostrar el mensaje de error específico
      });
  } else {
    // Cuando el input está vacío, cargas todas las ventas
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
        cantidadSelect.addEventListener("change", function () {
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

        // Ejecutar la lógica de cálculos para la cantidad inicial (1)
        cantidadSelect.dispatchEvent(new Event('change'));
      } else {
        // Manejar el caso donde precioProducto o cantidad no están definidos o son null

      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Llamar a la función al cargar la página para inicializar las opciones
seleccionarProducto();


// el diavlo 
function cargarProductosEditar() {
  const selectProducto = document.getElementById("eProducto");
  const subTotalInput = document.getElementById("eSubTotal");
  const cantidadSelect = document.getElementById("eCantidad");
  const ivaInput = document.getElementById("eIva");
  const montoTotalInput = document.getElementById("eMontoTotal");

  // Hacer una solicitud para obtener la lista de productos desde tu API
  fetch("https://localhost:7203/Venta/ListaProductos", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((productos) => {
      console.log(productos); // Verifica la respuesta del servidor

      // Limpiar opciones actuales
      selectProducto.innerHTML = "";

      // Agregar opciones al select basado en la lista de productos
      productos.forEach((producto) => {
        const option = document.createElement("option");
        option.value = producto.productoId;
        option.textContent = producto.nombreProducto;
        selectProducto.appendChild(option);
      });

      // Agregar un listener de eventos al campo de producto para manejar cambios en tiempo real
      selectProducto.addEventListener("change", function () {
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
              cantidadSelect.addEventListener("change", function () {
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

              // Ejecutar la lógica de cálculos para la cantidad inicial (1)
              cantidadSelect.dispatchEvent(new Event('change'));
            } else {
              // Manejar el caso donde precioProducto o cantidad no están definidos o son null
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });

      // Ejecutar la lógica de cálculos para el producto inicial
      selectProducto.dispatchEvent(new Event('change'));
    })
    .catch((error) => {
      console.error(error);
    });
}

// Llamar a la función al cargar la página para inicializar las opciones
cargarProductosEditar();



// el diavlo x2 

// pausa

// pausa
function crearVenta() {
  // Capturar los datos del formulario
  var clienteId = document.getElementById("selectCliente").value;
  var nombreCliente = document.getElementById("selectCliente").options[document.getElementById("selectCliente").selectedIndex].text;
  var cedulaCliente = document.getElementById("cedula").value;
  var productoId = document.getElementById("producto").value;
  var nombreProducto = document.getElementById("producto").options[document.getElementById("producto").selectedIndex].text;
  var cantidadProducto = document.getElementById("cantidad").value;
  var subTotal = document.getElementById("subTotal").value;
  var iva = document.getElementById("iva").value;
  var montoTotal = document.getElementById("montoTotal").value;

  // Obtener la fecha actual
  var fechaActual = new Date().toISOString().slice(0, 10);

  // Objeto de venta
  var venta = {
    clienteId: clienteId,
    nombreCliente: nombreCliente,
    cedulaCliente: cedulaCliente,
    productoId: productoId,
    nombreProducto: nombreProducto,
    cantidadProducto: cantidadProducto,
    subTotal: subTotal,
    iva: iva,
    montoTotal: montoTotal,
    fechaVenta: fechaActual,
  };

  // Actualizar el campo de fecha en el formulario
  document.getElementById("fechaVenta").value = fechaActual;

  // Realizar la solicitud POST a la API para crear la venta
  fetch("https://localhost:7203/Venta/CrearVenta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venta),
  })
    .then(response => {
      if (response.ok) {
        swal("¡Venta Agregada!", "La venta se ha agregado correctamente.", "success");
        cargarVentas();
        // Restablecer los valores del formulario
        document.getElementById("selectCliente").value = "";
        document.getElementById("cedula").value = "";
        document.getElementById("producto").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("subTotal").value = "";
        document.getElementById("iva").value = "";
        document.getElementById("montoTotal").value = "";
        cerrarModalCrearVenta();
      } else {
        swal("Error", "Ocurrió un error al agregar la venta. Por favor, inténtalo nuevamente.", "error");
      }
    })
    .catch(error => {
      console.error('Error al procesar la respuesta de la API:', error);
      console.error('Respuesta de la API:', venta);
      console.error('URL de la solicitud:', `https://localhost:7203/Venta/ListaProductos/${selectedProductoId}`);
    });
}




function eliminar(codFactura) {
  swal({
    title: "¿Está seguro que desea eliminar esta venta?",
    text: "Una vez eliminada, no podrá recuperar los datos.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      fetch(
        "https://localhost:7203/Venta/BorrarVenta/" + codFactura,
        {
          method: "DELETE"
        }
      )
        .then(response => {
          if (response.ok) {
            return response.json();  // Leer el contenido JSON de la respuesta
          } else {
            throw new Error(`Error al eliminar la venta: ${response.statusText}`);
          }
        })
        .then(data => {
          // Manejar la respuesta JSON, si es necesario
          console.log(data);
          swal("¡Venta Eliminada!", "La venta se ha eliminado correctamente.", "success");
          cargarVentas();
        })
        .catch(error => {
          console.error(error);
          swal("Error", "No se pudieron borrar los datos.", "error");
        });
    }
  });
}

// editar el diavlo


//EDITAR Venta



function cerrarModalModificarVenta() {
  modalEditar.hide();
}

const modalEditar = new bootstrap.Modal(
  document.getElementById("modalEditarVenta")
);
var formulario = document.getElementById("frmEventos");

function editar(codFactura, nombreCliente, cedula, nombreProducto, cantidad, subtotal, iva, montoTotal, fechaVenta) {
  // Llenar el modal con los datos de la venta
  document.getElementById("editCodFactura").value = codFactura;
  document.getElementById("editNombreCliente").value = nombreCliente;
  document.getElementById("editCedula").value = cedula;
  document.getElementById("editNombreProducto").value = nombreProducto;
  document.getElementById("editCantidad").value = cantidad;
  document.getElementById("editSubtotal").value = subtotal;
  document.getElementById("editIVA").value = iva;
  document.getElementById("editMontoTotal").value = montoTotal;
  document.getElementById("editFechaVenta").value = fechaVenta;

  // Cargar clienteId y productoId
  cargarInfoClienteProducto(codFactura);

  // Mostrar el modal
  $('#modalEditarVenta').modal('show');
}

function editar(codFactura, nombreCliente, cedula, nombreProducto, cantidad, subtotal, iva, montoTotal, fechaVenta) {
  // Llenar el modal con los datos de la venta
  document.getElementById("editCodFactura").value = codFactura;
  document.getElementById("editNombreCliente").value = nombreCliente;
  document.getElementById("editCedula").value = cedula;
  document.getElementById("editNombreProducto").value = nombreProducto;
  document.getElementById("editCantidad").value = cantidad;
  document.getElementById("editSubtotal").value = subtotal;
  document.getElementById("editIVA").value = iva;
  document.getElementById("editMontoTotal").value = montoTotal;
  document.getElementById("editFechaVenta").value = fechaVenta;

  console.log("Campos llenados en el modal:", {
    codFactura,
    nombreCliente,
    cedula,
    nombreProducto,
    cantidad,
    subtotal,
    iva,
    montoTotal,
    fechaVenta
  }); // Agregar este console log

  // Cargar clienteId y productoId
  cargarInfoClienteProducto(codFactura);

  // Mostrar el modal
  $('#modalEditarVenta').modal('show');
}

function actualizarVenta() {
  // Obtener los valores actualizados del formulario
  var codFactura = document.getElementById("editCodFactura").value;
  var clienteId = document.getElementById("editClienteId").value;
  var nombreCliente = document.getElementById("editNombreCliente").value;
  var cedula = document.getElementById("editCedula").value;
  var productoId = document.getElementById("editProductoId").value;
  var nombreProducto = document.getElementById("editNombreProducto").value;
  var cantidadProducto = document.getElementById("editCantidad").value;
  var subTotal = document.getElementById("editSubtotal").value;
  var iva = document.getElementById("editIVA").value;
  var montoTotal = document.getElementById("editMontoTotal").value;
  var fechaVenta = new Date(document.getElementById("editFechaVenta").value).toISOString();

  // Validar los datos antes de enviar la solicitud
  if (!codFactura || !nombreCliente || !cedula || !nombreProducto || isNaN(cantidadProducto) || isNaN(subTotal) || isNaN(iva) || isNaN(montoTotal) || !fechaVenta) {
    swal("Error", "Por favor, completa todos los campos con valores válidos.", "error");
    return;
  }

  // Construir el objeto de datos a enviar al servidor
  var datosActualizar = {
    codFactura: parseInt(codFactura),
    clienteId: parseInt(clienteId),
    nombreCliente: nombreCliente,
    cedulaCliente: cedula,
    productoId: parseInt(productoId),
    nombreProducto: nombreProducto,
    cantidadProducto: parseInt(cantidadProducto),
    subtotal: parseFloat(subTotal),
    iva: parseFloat(iva),
    montoTotal: parseFloat(montoTotal),
    fechaVenta: fechaVenta
  };

  console.log("Datos a actualizar:", datosActualizar); // Agregar este console log

  // Realizar la solicitud PUT al servidor
  fetch("https://localhost:7203/Venta/EditarVenta", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosActualizar),
  })
    .then(response => {
      console.log("Respuesta del servidor:", response); // Agregar este console log
      if (response.ok) {
        swal("¡Venta Actualizada!", "La venta se ha actualizado correctamente.", "success");
        cargarVentas(); // Vuelve a cargar las ventas después de la actualización
        $('#modalEditarVenta').modal('hide'); // Cierra el modal después de actualizar
      } else {
        swal("Error", "Ocurrió un error al actualizar la venta. Por favor, inténtalo nuevamente.", "error");
      }
    })
    .catch(error => {
      console.error('Error al procesar la respuesta de la API:', error);
    });
}







// editar el diavlo 

// equis de equis de 
function mostrarModalCrearVenta() {
  cargarClientes();
  cargarProductos();
  cargarFechaVenta();
  modalCrearVenta.show();
}
// equis de equis de 
function cerrarModalCrearVenta() {
  $('#cedula').val('');
  $('#subTotal').val('');
  modalCrearVenta.hide();
}



function cargarFechaVenta() {
  fetch("https://localhost:7203/Venta/ObtenerFechaActual")
    .then(response => response.json())
    .then(data => {
      var fechaActual = new Date(data.fecha);
      document.getElementById("fechaVenta").value = fechaActual.toISOString().slice(0, 10);
    })
    .catch(error => {
      console.error('Error al obtener la fecha del servidor:', error);
    });
}

function cargarInfoClienteProducto(codFactura) {
  fetch(`https://localhost:7203/Venta/ObtenerInfoClienteProducto/${codFactura}`)
    .then(response => response.json())
    .then(data => {
      console.log('Datos obtenidos:', data);

      // Verifica si los valores son numéricos antes de asignarlos
      if (!isNaN(data.clienteId)) {
        document.getElementById("editClienteId").value = data.clienteId;
      }

      if (!isNaN(data.productoId)) {
        document.getElementById("editProductoId").value = data.productoId;
      }
    })
    .catch(error => {
      console.error('Error al cargar la información del cliente y producto:', error);
    });
}



function imprimirPdf(codFactura, nombreCliente, cedulaCliente, nombreProducto, cantidadProducto, subtotal, iva, montoTotal, fechaVenta) {
  // Crear un nuevo documento jsPDF
  const pdf = new jsPDF();

  // Añadir título al documento
  pdf.setFont("times", "bold");
  pdf.setFontSize(20);
  pdf.text("FACTURA DE VENTA", 20, 20);

  // Añadir detalles de la venta al documento
  pdf.setFontSize(12);
  pdf.text(`Código de Factura: ${codFactura}`, 20, 30);
  pdf.text(`Nombre del Cliente: ${nombreCliente}`, 20, 40);
  pdf.text(`Cédula del Cliente: ${cedulaCliente}`, 20, 50);
  pdf.text(`Nombre del Producto: ${nombreProducto}`, 20, 60);
  pdf.text(`Cantidad: ${cantidadProducto}`, 20, 70);
  pdf.text(`Subtotal: ${subtotal}`, 20, 80);
  pdf.text(`IVA: ${iva}`, 20, 90);
  pdf.text(`Monto Total: ${montoTotal}`, 20, 100);
  pdf.text(`Fecha de Venta: ${fechaVenta}`, 20, 110);

  // Guardar el documento con un nombre específico
  const filename = `factura_${codFactura}.pdf`;
  pdf.save(filename);
}

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el campo de fecha de venta
  var fechaVentaField = document.getElementById("fechaVenta");

  // Obtener la fecha actual
  var fechaActual = new Date().toISOString().slice(0, 10);

  // Asignar la fecha actual al campo de fecha de venta
  fechaVentaField.value = fechaActual;
});