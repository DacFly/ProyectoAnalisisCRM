//esta es la tabla que esta en la html 
var contenidoTablaResultado = document.querySelector("#resultados");
//modal para crear eventos
var modalCrearUsuario = new bootstrap.Modal(document.getElementById('modalCrearUsuario'))
//campo de texto para busqueda de la cedula
const input = document.getElementById("inputNombre");


function cargarUsuarios(){
  fetch(
    "https://localhost:7203/Usuario/listaUsuarios",
    {
      method: "GET",
    }
  )
    .then((usuario) => usuario.json())
    .then((jsonUsuario) => {
      contenidoTablaResultado.innerHTML = ``;
      console.log(jsonUsuario)
      for (const usuario of jsonUsuario) {
        contenidoTablaResultado.innerHTML += `
              <tr class="table-primary" >
                  <td>${usuario.usuarioId}</td>
                  <td>${usuario.nombre}</td>
                  <td>${usuario.apellido}</td>
                  <td>${usuario.contrasena}</td>
                  <td>${usuario.rol}</td>
                  <td>
                    <a name="" id="" class="btn btn-info" onclick="editar('${usuario.usuarioId}','${usuario.nombre}', '${usuario.apellido}', '${usuario.contrasena}', '${usuario.rol}')" role="button">Editar</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${usuario.usuarioId}')" role="button">Eliminar</a>
                  </td>
              </tr>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}
cargarUsuarios();
// Agrega un oyente de eventos al input
input.addEventListener("input", function () {
  if (input.value != "") {
    fetch(
      "https://localhost:7203/Usuario/UsuarioPorROL/" + input.value,
      {
        method: "GET",
      }
    )
      .then((usuario) => usuario.json())
      .then((jsonUsuario) => {
        contenidoTablaResultado.innerHTML = ``;
        console.log(jsonUsuario)
        for (const usuario of jsonUsuario) {
          contenidoTablaResultado.innerHTML += `
          <tr class="table-primary" >
                  <td>${usuario.usuarioId}</td>
                  <td>${usuario.nombre}</td>
                  <td>${usuario.apellido}</td>
                  <td>${usuario.contrasena}</td>
                  <td>${usuario.rol}</td>
                  <td>
                    <a name="" id="" class="btn btn-info" onclick="editar('${usuario.usuarioId}','${usuario.nombre}', '${usuario.apellido}', '${usuario.contrasena}', '${usuario.rol}')" role="button">Editar</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${usuario.usuarioId}')" role="button">Eliminar</a>
                  </td>
              </tr>`;
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
        console.error(error);
      });
  }else cargarUsuarios();
});

function mostrarModalCrearUsuario() {
  modalCrearUsuario.show();
}
function cerrarModalCrearUsuario() {
  modalCrearUsuario.hide();
}


function creaUsuario(){
  //captura los datos de la interfaz 
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var contrasena = document.getElementById('contrasena').value;
  var rol = document.getElementById('rol').value;

  //jsopn para la solicitud 
  var usuario = {
    usuarioId: 0, // Cambiar el valor del usuarioId según corresponda
    nombre: nombre,
    apellido: apellido,
    contrasena: contrasena,
    rol: rol
  };
  
  // Realizar la solicitud POST a la API para crear el evento
  fetch('https://localhost:7203/Usuario/CrearUsuario', {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(usuario)
  }).then(response => {
    if(response.status==201)
    {
    swal("¡Usuario Agregado!", "El usuario se ha agregado correctamente.", "success");
    cargarUsuarios();
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('contrasena').value = '';
      document.getElementById('rol').value = '';
      cerrarModalCrearUsuario()
    }else{swal("Error", "Ocurrió un error al agregar al usuario. Por favor, inténtalo nuevamente.", "error")}
  })
    .catch(console.log);
}


//EDITAR CLIENTE

function cerrarModalModificarUsuario(){
  modalEditar.hide();
}

const modalEditar = new bootstrap.Modal(
  document.getElementById("modalEditarUsuario")
);
var formulario = document.getElementById("frmEventos");

function editar(usuarioId,nombre, apellido,contrasena,rol) {
  document.getElementById("eUsuarioId").value = usuarioId;
  document.getElementById("eNombre").value = nombre;
  document.getElementById("eApellido").value = apellido;
  document.getElementById("eContrasena").value = contrasena;
  document.getElementById("eRol").value = rol;
  modalEditar.show();
}

formulario.addEventListener("submit", function (e) { 
  e.preventDefault();
  var usuarioId = document.getElementById("eUsuarioId").value;
  var nombre = document.getElementById("eNombre").value;
  var apellido = document.getElementById("eApellido").value;
  var contrasena = document.getElementById("eContrasena").value;
  var rol = document.getElementById("eRol").value;

  
  
  var datosenviar = {
    usuarioId: usuarioId,
    nombre: nombre,
    apellido: apellido,
    contrasena: contrasena,
    rol: rol

  };
  console.log(datosenviar);
  fetch("https://localhost:7203/Usuario/EditarUsuario", {
    method: "PUT",
    headers: { "content-type": "application/json " },
    body: JSON.stringify(datosenviar),
  }) //url de peticion de datos
    .then((respuesta) => {
      console.log(respuesta.status);
      if (respuesta.status == 204) {

        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("contrasena").value = "";
        document.getElementById("rol").value = "";

        
        swal(
          "Se ha modificado correctamente!",
          "Presiona el boton!",
          "success"
        )
        .then((willDelete) => {
          if (willDelete) {
      
            modalEditar.hide();
            cargarUsuarios();
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
function eliminar(usuarioId) {
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      console.log(usuarioId);
      fetch(
        "https://localhost:7203/Usuario/BorrarUsuario/" + usuarioId,
        {
          method: "DELETE"
          
        }
      ) //url de peticion de datos
        .then(datosrepuesta => {
          console.log(datosrepuesta.status); 
          if(datosrepuesta.status == 204){
            swal("¡Usuario Eliminado!", "El usuario se ha eliminado correctamente.", "success");
        
            cargarUsuarios();
       
          }else{
            swal("No se borraron los datos");
          }
        })
        .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    } 
  });
}