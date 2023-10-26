//esta es la tabla que esta en la html 
var contenidoTablaResultado = document.querySelector("#resultados");
//modal para crear eventos
var modalCrearCliente = new bootstrap.Modal(document.getElementById('modalCrearCliente'))
//campo de texto para busqueda de la cedula
const input = document.getElementById("inputNombre");


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

function mostrarModalCrearCliente() {
  modalCrearCliente.show();
}
function cerrarModalCrearCliente() {
  modalCrearCliente.hide();
}


function creaCliente(){
  //captura los datos de la interfaz 
  var cedula = document.getElementById('cedula').value;
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var correo = document.getElementById('correo').value;
  var telefono = document.getElementById('telefono').value;

  //jsopn para la solicitud 
  var cliente = {
    clienteId: 0, // Cambiar el valor del usuarioId según corresponda
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: telefono
  };

  // Realizar la solicitud POST a la API para crear el evento
  fetch('https://localhost:7203/Cliente/CrearCliente', {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(cliente)
  }).then(response => {
    if(response.status==201)
    {
    swal("¡Evento creado!", "El evento ha sido creado exitosamente.", "success");
      cargarClintes();
      document.getElementById('cedula').value = '';
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('correo').value = '';
      document.getElementById('telefono').value = '';
      cerrarModalCrearCliente()
    }else{swal("Error", "Ocurrió un error al crear el evento. Por favor, inténtalo nuevamente.", "error")}
  })
    .catch(console.log);
}
