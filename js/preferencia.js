var contenidoTablaResultado = document.querySelector("#resultados");
//modal para crear eventos
var modalCrearPreferencia = new bootstrap.Modal(document.getElementById('modalCrearPreferencia'))
//campo de texto para busqueda de la cedula
const input = document.getElementById("inputNombre");


function cargarPreferencias(){
  fetch(
    "https://localhost:7203/Preferencia/listaPreferencias",
    {
      method: "GET",
    }
  )
    .then((preferencias) => preferencias.json())
    .then((jsonPreferencias) => {
      contenidoTablaResultado.innerHTML = ``;
      console.log(jsonPreferencias)
      for (const preferencias of jsonPreferencias) {
        contenidoTablaResultado.innerHTML += `
              <tr class="table-primary" >
                  <td>${preferencias.idPreferencia}</td>
                  <td>${preferencias.codigoPreferencia}</td>
                  <td>${preferencias.nombreCliente}</td>
                  <td>${preferencias.descripcion}</td>
                  
                  <td>
                    <a name="" id="" class="btn btn-info" onclick="editar('${preferencias.idPreferencia}', '${preferencias.codigoPreferencia}', '${preferencias.nombreCliente}', '${preferencias.descripcion}')" role="button">Editar</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${preferencias.idPreferencia}')" role="button">Eliminar</a>
                  </td>
              </tr>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}
cargarPreferencias();

input.addEventListener("input", function () {
  if (input.value != "") {
    fetch(
      "https://localhost:7203/Preferencia/PreferenciasPorNombre/" + input.value,
      {
        method: "GET",
      }
    )
      .then((preferencias) => preferencias.json())
      .then((jsonPreferencias) => {
        contenidoTablaResultado.innerHTML = ``;
        console.log(jsonPreferencias)
        for (const preferencias of jsonPreferencias) {
          contenidoTablaResultado.innerHTML += `
          <tr class="table-primary" >
                  <td>${preferencias.idPreferencia}</td>
                  <td>${preferencias.codigoPreferencia}</td>
                  <td>${preferencias.nombreCliente}</td>
                  <td>${preferencias.descripcion}</td>
                  
                  <td>
                    <a name="" id="" class="btn btn-info" onclick="editar('${preferencias.idPreferencia}', '${preferencias.codigoPreferencia}', '${preferencias.nombreCliente}', '${preferencias.descripcion}')" role="button">Editar</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${preferencias.idPreferencia}')" role="button">Eliminar</a>
                  </td>
              </tr>`;
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
        console.error(error);
      });
  }else cargarPreferencias();
});


function mostrarModalCrearPreferencia() {
  modalCrearPreferencia.show();
}
function cerrarModalCrearPreferencia() {
  modalCrearPreferencia.hide();
}


function creaPreferencia(){
  //captura los datos de la interfaz 
  var codigoPreferencia = document.getElementById('codigoPreferencia').value;
  var nombreCliente = document.getElementById('nombreCliente').value;
  var descripcion = document.getElementById('descripcion').value;
  
  

  //jsopn para la solicitud 
  var preferencia = {
    idPreferencia: 0, // Cambiar el valor del usuarioId según corresponda
    codigoPreferencia: codigoPreferencia,
    nombreCliente: nombreCliente,
    descripcion: descripcion,
   
  };

  console.log(preferencia);
  // Realizar la solicitud POST a la API para crear el evento
  fetch('https://localhost:7203/Preferencia/CrearPreferencia', {
    
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(preferencia)
  }).then(response => {
    if(response.status==201)
    {
    swal("¡Preferencia del cliente Agregada!", "La preferencia se ha agregado correctamente.", "success");
    cargarPreferencias();
      document.getElementById('codigoPreferencia').value = '';
      document.getElementById('nombreCliente').value = '';
      document.getElementById('descripcion').value = '';
      cerrarModalCrearPreferencia()
    }else{swal("Error", "Ocurrió un error al agregar la preferencia. Por favor, inténtalo nuevamente.", "error")}
  })
    .catch(console.log);
}


//EDITAR CLIENTE

function cerrarModalModificarPreferencia(){
  modalEditar.hide();
}

const modalEditar = new bootstrap.Modal(
  document.getElementById("modalEditarPreferencia")
);
var formulario = document.getElementById("frmEventos");

function editar(idPreferencia,codigoPreferencia, nombreCliente, descripcion) {
  document.getElementById("eIdPreferencia").value = idPreferencia;
  document.getElementById("eCodigoPreferencia").value = codigoPreferencia;
  document.getElementById("eNombreCliente").value = nombreCliente;
  document.getElementById("eDescripcion").value = descripcion;
  modalEditar.show();
}

formulario.addEventListener("submit", function (e) { 
  e.preventDefault();

  var idPreferencia = document.getElementById("eIdPreferencia").value;
  var codigoPreferencia = document.getElementById("eCodigoPreferencia").value;
  var nombreCliente = document.getElementById("eNombreCliente").value;
  var descripcion = document.getElementById("eDescripcion").value;

  

  var datosenviar = {
    idPreferencia: idPreferencia,
    codigoPreferencia: codigoPreferencia,
    nombreCliente: nombreCliente,
    descripcion: descripcion
  };
  console.log(datosenviar);
  fetch("https://localhost:7203/Preferencia/EditarPreferencia", {
    method: "PUT",
    headers: { "content-type": "application/json " },
    body: JSON.stringify(datosenviar),
  }) //url de peticion de datos
    .then((respuesta) => {
      console.log(respuesta.status);
      if (respuesta.status == 204) {
        document.getElementById("codigoPreferencia").value = "";
        document.getElementById("nombreCliente").value = "";
        document.getElementById("descripcion").value = "";

        
        swal(
          "Se ha modificado correctamente!",
          "Presiona el boton!",
          "success"
        )
        .then((willDelete) => {
          if (willDelete) {
      
            modalEditar.hide();
            cargarPreferencias();
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
function eliminar(idPreferencia) {
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {

      console.log(idPreferencia);
      fetch(
        "https://localhost:7203/Preferencia/BorrarPreferencia/" + idPreferencia,
        {
          method: "DELETE"
          
        }
      ) //url de peticion de datos
      .then(datosrepuesta => {
        console.log(datosrepuesta.status); 
        if(datosrepuesta.status == 204){
          swal("¡Preferencia del Cliente Eliminada!", "La preferencia se ha eliminado correctamente.", "success");
      
          cargarPreferencias();
     
        }else{
          swal("No se borraron los datos");
        }
      })
      .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    } 
  });
}