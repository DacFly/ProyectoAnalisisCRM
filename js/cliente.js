var contenidoTablaResultado = document.querySelector("#resultados");
function cargarClintes(){
  fetch(
    "https://localhost:7203/Cliente/listaClientes",
    {
      method: "GET",
    }
  )
    .then((clientes) => clientes.json())
    .then((jsonClientes) => {
      contenidoTablaResultado.innerHTML = ``;
      console.log(jsonClientes)
      for (const cliente of jsonClientes) {
        contenidoTablaResultado.innerHTML += `
              <tr class="table-primary" >
                  <td>${cliente.clienteId}</td>
                  <td>${cliente.cedula}</td>
                  <td>${cliente.nombre}</td>
                  <td>${cliente.apellido}</td>
                  <td>${cliente.correo}</td>
                  <td>${cliente.telefono}</td>
                  <td>
                    <a name="" id="" class="btn btn-primary" onclick="editar(${sessionStorage.getItem("id")},'${cliente.ClienteId}', '${cliente.Cedula}', '${cliente.Nombre}', '${cliente.Apellido}', '${cliente.Correo}', '${cliente.Telefono}')" role="button">Edit</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${cliente.ClienteId}')" role="button">Elim</a>
                  </td>
              </tr>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}
cargarClintes();



//campo de texto para busqueda de la cedula
const input = document.getElementById("inputNombre");
// Agrega un oyente de eventos al input
input.addEventListener("input", function () {
  if (input.value != "") {
    fetch(
      "https://localhost:7203/Cliente/ClientePorNombre/" + input.value,
      {
        method: "GET",
      }
    )
      .then((clientes) => clientes.json())
      .then((jsonClientes) => {
        contenidoTablaResultado.innerHTML = ``;
        console.log(jsonClientes)
        for (const cliente of jsonClientes) {
          contenidoTablaResultado.innerHTML += `
              <tr class="table-primary" >
                  <td>${cliente.clienteId}</td>
                  <td>${cliente.cedula}</td>
                  <td>${cliente.nombre}</td>
                  <td>${cliente.apellido}</td>
                  <td>${cliente.correo}</td>
                  <td>${cliente.telefono}</td>
                  <td>
                    <a name="" id="" class="btn btn-primary" onclick="editar(${sessionStorage.getItem("id")},'${cliente.ClienteId}', '${cliente.Cedula}', '${cliente.Nombre}', '${cliente.Apellido}', '${cliente.Correo}', '${cliente.Telefono}')" role="button">Edit</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${cliente.ClienteId}')" role="button">Elim</a>
                  </td>
              </tr>`;
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
        console.error(error);
      });
  }else cargarClintes();
});



