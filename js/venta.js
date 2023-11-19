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
              <td>${venta.nombre}</td>
              <td>${venta.cedula}</td>
              <td>${venta.subTotal}</td>
              <td>${venta.iva}</td>
              <td>${venta.montoTotal}</td>
              <td>${venta.fechaVenta}</td>
              <td>
                <a name="" id="" class="btn btn-info" onclick="editar(${venta.codFactura},'${venta.nombre}', '${venta.cedula}', ${venta.subTotal}, ${venta.iva}, ${venta.montoTotal}, '${venta.fechaVenta}')" role="button">Editar</a>
                <a name="" id="" class="btn btn-danger" onclick="eliminar(${venta.codFactura})" role="button">Eliminar</a>
              </td>
            </tr>`;
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
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
                <td>${venta.subTotal}</td>
                <td>${venta.iva}</td>
                <td>${venta.montoTotal}</td>
                <td>${venta.fechaVenta}</td>
                <td>
                  <a name="" id="" class="btn btn-info" onclick="editar(${venta.codFactura},'${venta.nombre}', '${venta.cedula}', ${venta.subTotal}, ${venta.iva}, ${venta.montoTotal}, '${venta.fechaVenta}')" role="button">Editar</a>
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
  


function mostrarModalCrearVenta() {
  modalCrearVenta.show();
}

function cerrarModalCrearVenta() {
  modalCrearVenta.hide();
}
