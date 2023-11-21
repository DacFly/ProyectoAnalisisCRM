//esta es la tabla que esta en la html 
var contenidoTablaResultado = document.querySelector("#resultados");
//modal para crear eventos
var modalCrearCliente = new bootstrap.Modal(document.getElementById('modalCrearCliente'))
//campo de texto para busqueda de la cedula
const input = document.getElementById("inputNombre");


function cargarClientes(){
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
                    <a name="" id="" class="btn btn-info" onclick="editar('${cliente.clienteId}','${cliente.cedula}', '${cliente.nombre}', '${cliente.apellido}', '${cliente.correo}', '${cliente.telefono}')" role="button">Editar</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${cliente.clienteId}')" role="button">Eliminar</a>
                  </td>
              </tr>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}
cargarClientes();
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
            <a name="" id="" class="btn btn-info" onclick="editar('${cliente.clienteId}','${cliente.cedula}', '${cliente.nombre}', '${cliente.apellido}', '${cliente.correo}', '${cliente.telefono}')" role="button">Editar</a>
            <a name="" id="" class="btn btn-danger" onclick="eliminar('${cliente.clienteId}')" role="button">Eliminar</a>
          </td>
      </tr>`;
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
        console.error(error);
      });
  }else cargarClientes();
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
    swal("¡Cliente Agregado!", "El cliente se ha agregado correctamente.", "success");
    cargarClientes();
      document.getElementById('cedula').value = '';
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('correo').value = '';
      document.getElementById('telefono').value = '';
      cerrarModalCrearCliente()
    }else{swal("Error", "Ocurrió un error al agregar al cliente. Por favor, inténtalo nuevamente.", "error")}
  })
    .catch(console.log);
}


//EDITAR CLIENTE

function cerrarModalModificarCliente(){
  modalEditar.hide();
}

const modalEditar = new bootstrap.Modal(
  document.getElementById("modalEditarCliente")
);
var formulario = document.getElementById("frmEventos");

function editar(clienteId,cedula, nombre, apellido,correo,telefono) {
  document.getElementById("eClienteId").value = clienteId;
  document.getElementById("eCedula").value = cedula;
  document.getElementById("eNombre").value = nombre;
  document.getElementById("eApellido").value = apellido;
  document.getElementById("eCorreo").value = correo;
  document.getElementById("eTelefono").value = telefono;
  modalEditar.show();
}

formulario.addEventListener("submit", function (e) { 
  e.preventDefault();
  var clienteId = document.getElementById("eClienteId").value;
  var cedula = document.getElementById("eCedula").value;
  var nombre = document.getElementById("eNombre").value;
  var apellido = document.getElementById("eApellido").value;
  var correo = document.getElementById("eCorreo").value;
  var telefono = document.getElementById("eTelefono").value;

  
  
  var datosenviar = {
    clienteId: clienteId,
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: telefono

  };
  console.log(datosenviar);
  fetch("https://localhost:7203/Cliente/EditarCliente", {
    method: "PUT",
    headers: { "content-type": "application/json " },
    body: JSON.stringify(datosenviar),
  }) //url de peticion de datos
    .then((respuesta) => {
      console.log(respuesta.status);
      if (respuesta.status == 204) {
        document.getElementById("cedula").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("telefono").value = "";
        
        
        swal(
          "Se ha modificado correctamente!",
          "Presiona el boton!",
          "success"
        )
        .then((willDelete) => {
          if (willDelete) {
      
            modalEditar.hide();
            cargarClientes();
          } 
        });
      }
      else{
        swal("No se ha modificado!", "Presiona el boton!", "error")
      }
    })
    .catch(console.log); //muestra errores
});


//eliminar
function eliminar(idCliente) {
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      console.log(idCliente);
      fetch(
        "https://localhost:7203/Cliente/BorrarCliente/" + idCliente,
        {
          method: "DELETE"
          
        }
      ) //url de peticion de datos
        .then(datosrepuesta => {
          console.log(datosrepuesta.status); 
          if(datosrepuesta.status == 204){
            swal("¡Cliente Eliminado!", "El cliente se ha eliminado correctamente.", "success");
        
            cargarClientes();
       
          }else{
            swal("No se borraron los datos");
          }
        })
        .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    } 
  });
}

