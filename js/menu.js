var contenido = document.querySelector("#menu");


contenido.innerHTML += `
<div class="container-fluid">

  <div class="row ">

    <div class="site-logo col-6">
      <a href="index.html"> <img src="images/logo.png" alt="Texto alternativo de la imagen" style="height: 100px;width: 140px">
      </a>
    </div>
    ${sessionStorage.getItem("rol") === "administrador" ? ' <li><a href="Clientes.html" class="nav-link ">Clientes</a></li>' : ''}
    <nav class="mx-auto site-navigation">
      <ul class="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
      ${sessionStorage.getItem("sesion") !== "false" ? '  <li><a href="Usuarios.html" class="nav-link ">Usuarios</a></li> '+
      '<li><a href="TareasPendientes.html" class="nav-link ">Tareas Pendientes</a></li> '+
      '<li><a href="Preferencias.html" class="nav-link ">Preferencias</a></li> '+
      '<li><a href="Ventas.html" class="nav-link ">Ventas</a></li>' : ''} 
       
        <li><a href="Producto.html" class="nav-link ">Productos</a></li>
      </ul>
    </nav>

    <div class="right-cta-menu text-right d-flex aligin-items-center col-6">
      <div class="ml-auto">
        <div class="dropdown ">
          <nav class="mx-auto   site-navigation">
            <ul class="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li class="has-children">
                <a href="#" >${sessionStorage.getItem("nombre")}</a>
                <ul class="dropdown">
                  <li><a href="modificarPerfil.html">Modificar Perfil</a></li>
                  <li><a onclick="eliminarP()">Eliminar Perfil</a></li>
                  <li><a onclick="singOut()">Cerrar Sesion</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      ${sessionStorage.getItem("sesion") === "false" ? 
      '<ul class="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">'+
      '<div class="aligin-items-center" style="margin-left: 36px;padding: 20px;">'+
      
        ' <a href="login.html" type="button" class=" mx-auto btn btn-primary">Login</a>'+
      '</div>'+
    '</ul>' : ''}
      

      <a href="#" class="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span class="icon-menu h3 m-0 p-0 mt-2"></span></a>
    </div>
    
   
  </div>
</div>

`;



//var modalCrearEvento = new bootstrap.Modal(document.getElementById('modalCrearEvento'))

function mostrarModalCrearEvento() {
  modalCrearEvento.show();
}

function cerrarModalCrearEvento() {
  modalCrearEvento.hide();
}

function singOut() {
  sessionStorage.setItem("sesion", "false");
  sessionStorage.setItem("rol", "");
  sessionStorage.setItem("nombre", "");
  sessionStorage.setItem("id", "");
  window.location.href = "login.html";
}

function crearNuevoEv() {
  var titulo = document.getElementById('evento').value;
  var fechaPublicacion = document.getElementById('fechaPublicacion').value;
  var fechaEvento = document.getElementById('fechaEvento').value;
  var hora = document.getElementById('hora').value;
  var descripcion = document.getElementById('descripcion').value;
  var direccion = document.getElementById('direccion').value;

  // Crear el objeto de evento con los valores del formulario
  var id = parseInt(sessionStorage.getItem("id"));

  var nuevoEvento = {
    idEvento: 0, // Cambiar el valor del usuarioId según corresponda
    usuarioId: id,
    titulo: titulo,
    fechaPublicacion: fechaPublicacion,
    fechaEvento: fechaEvento,
    hora: hora,
    descripcion: descripcion,
    direccion: direccion
  };
  // Realizar la solicitud POST a la API para crear el evento
  fetch('https://localhost:7088/Evento/CrearEvento', {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(nuevoEvento)
  }).then(response => {
    if (response.status == 201) {
      swal("¡Evento creado!", "El evento ha sido creado exitosamente.", "success");
      cargarEventos()
      cerrarModalCrearEvento()
      document.getElementById('evento').value = '';
      document.getElementById('fechaPublicacion').value = '';
      document.getElementById('fechaEvento').value = '';
      document.getElementById('hora').value = '';
      document.getElementById('descripcion').value = 'Ingrese descripcion';
      document.getElementById('direccion').value = '';
    } else { swal("Error", "Ocurrió un error al crear el evento. Por favor, inténtalo nuevamente.", "error") }
  })
    .catch(console.log);
}

function eliminarP(idUsuario) {
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {

      console.log(idUsuario);
      var idUsuario = parseInt(sessionStorage.getItem("id"));
      fetch(
        "https://localhost:7088/Usuario/BorrarUsuario/" + idUsuario,
        {
          method: "DELETE"

        }
      ) //url de peticion de datos
        .then(datosrepuesta => {
          if (datosrepuesta.status == 204) {
            swal("Eliminado correctamente", {
              icon: "success",
            });
            singOut()
          } else {
            swal("No se borraron los datos");
          }
        })
        .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    }
  });
  var datosenviar = {
    idUsuario: idUsuario,
  };

}


