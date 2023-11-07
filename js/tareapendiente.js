var contenidoTablaResultado = document.querySelector("#resultados");
//modal para crear eventos
var modalCrearTareaP = new bootstrap.Modal(document.getElementById('modalCrearTareaP'))
//campo de texto para busqueda de la cedula
const input = document.getElementById("inputCodigo");


function cargarTareaP(){
  fetch(
    "https://localhost:7203/TareaPendiente/listaTareasPendientes",
    {
      method: "GET",
    }
  )
    .then((tareaP) => tareaP.json())
    .then((jsonTareaP) => {
      contenidoTablaResultado.innerHTML = ``;
      console.log(jsonTareaP)
      for (const tareaP of jsonTareaP) {
        contenidoTablaResultado.innerHTML += `
              <tr class="table-primary" >
                  <td>${tareaP.tareaId}</td>
                  <td>${tareaP.codigoTarea}</td>
                  <td>${tareaP.nombreT}</td>
                  <td>${tareaP.nombreCliente}</td>
                  <td>${tareaP.descripcion}</td>
                  <td>${tareaP.fechaCreacion}</td>
                  <td>${tareaP.fechaFinalizacion}</td>
                  <td>
                    <a name="" id="" class="btn btn-info" onclick="editar('${tareaP.tareaId}', '${tareaP.codigoTarea}','${tareaP.nombreT}', '${tareaP.nombreCliente}', '${tareaP.descripcion}', '${tareaP.fechaCreacion}', '${tareaP.fechaFinalizacion}')" role="button">Editar</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${tareaP.tareaId}')" role="button">Eliminar</a>
                  </td>
              </tr>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}
cargarTareaP();
// Agrega un oyente de eventos al input
input.addEventListener("input", function () {
  if (input.value != "") {
    fetch(
      "https://localhost:7203/TareaPendiente/BuscarTareaP/" + input.value,
      {
        method: "GET",
      }
    )
      .then((tareaP) => tareaP.json())
      .then((jsonTareaP) => {
        contenidoTablaResultado.innerHTML = ``;
        console.log(jsonTareaP)
        for (const tareaP of jsonTareaP) {
          contenidoTablaResultado.innerHTML += `
          <tr class="table-primary" >
          <td>${tareaP.tareaId}</td>
          <td>${tareaP.codigoTarea}</td>
          <td>${tareaP.nombreT}</td>
          <td>${tareaP.nombreCliente}</td>
          <td>${tareaP.descripcion}</td>
          <td>${tareaP.fechaCreacion}</td>
          <td>${tareaP.fechaFinalizacion}</td>
          <td>
            <a name="" id="" class="btn btn-info" onclick="editar('${tareaP.tareaId}', '${tareaP.codigoTarea}','${tareaP.nombreT}', '${tareaP.nombreCliente}', '${tareaP.descripcion}', '${tareaP.fechaCreacion}', '${tareaP.fechaFinalizacion}')" role="button">Editar</a>
            <a name="" id="" class="btn btn-danger" onclick="eliminar('${tareaP.tareaId}')" role="button">Eliminar</a>
          </td>
          </tr>`;
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
        console.error(error);
      });
  }else cargarTareaP();
});



input.addEventListener("input", function () {
  if (input.value != "") {
    fetch(
      "https://localhost:7203/TareaPendiente/TareaPorID/" + input.value,
      {
        method: "GET",
      }
    )
      .then((tareaP) => tareaP.json())
      .then((jsonTareaP) => {
        contenidoTablaResultado.innerHTML = ``;
        console.log(jsonTareaP)
        for (const tareaP of jsonTareaP) {
          contenidoTablaResultado.innerHTML += `
          <tr class="table-primary" >
          <td>${tareaP.tareaId}</td>
          <td>${tareaP.clienteId}</td>
          <td>${tareaP.descripcion}</td>
          <td>${tareaP.fechaCreacion}</td>
          <td>${tareaP.fechaFinalizacion}</td>
          <td>
            <a name="" id="" class="btn btn-info" onclick="editar(${sessionStorage.getItem("id")},'${tareaP.TareaId}', '${tareaP.ClienteId}', '${tareaP.Descripcion}', '${tareaP.FechaCreacion}', '${tareaP.FechaFinalizacion}')" role="button">Editar</a>
            <a name="" id="" class="btn btn-danger" onclick="eliminar('${tareaP.TareaId}')" role="button">Eliminar</a>
          </td>
      </tr>`;
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
        console.error(error);
      });
  }else cargarTareaP();
});




function mostrarModalCrearTareaP() {
  modalCrearTareaP.show();
}
function cerrarModalCrearTareaP() {
  modalCrearTareaP.hide();
}


function creaTareaP(){
  //captura los datos de la interfaz 
  
  var codigoTarea = document.getElementById("codigoTarea").value;
  var nombreT = document.getElementById("nombreT").value;
  var nombreCliente = document.getElementById('nombreCliente').value;
  var descripcion = document.getElementById('descripcion').value;
  var fechaCreacion = document.getElementById('fechaCreacion').value;
  var fechaFinalizacion = document.getElementById('fechaFinalizacion').value;

  //jsopn para la solicitud 
  var tareaP = {
    tareaId: 0,
    codigoTarea: codigoTarea,
    nombreT: nombreT,
    nombreCliente: nombreCliente, 
    descripcion: descripcion,
    fechaCreacion: fechaCreacion,
    fechaFinalizacion: fechaFinalizacion
  };

  // Realizar la solicitud POST a la API para crear el evento
  fetch('https://localhost:7203/TareaPendiente/CrearTareaP', {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(tareaP)
  }).then(response => {
    if(response.status==201)
    {
    swal("Tarea Pendiente Agregada!", "La tarea se ha agregado correctamente.", "success");
    cargarTareaP();
      document.getElementById('tareaId').value = '';
      document.getElementById('codigoTarea').value = '';
      document.getElementById('nombreT').value = '';
      document.getElementById('nombreCliente').value = '';
      document.getElementById('descripcion').value = '';
      document.getElementById('fechaCreacion').value = '';
      document.getElementById('fechaFinalizacion').value = '';
      cerrarModalCrearTareaP()
    }else{swal("Error", "Ocurrió un error al agregar la tarea. Por favor, inténtalo nuevamente.", "error")}
  })
    .catch(console.log);
}


//EDITAR CLIENTE

function cerrarModalModificarTareaP(){
  modalEditar.hide();
}

const modalEditar = new bootstrap.Modal(
  document.getElementById("modalEditarTareaP")
);
var formulario = document.getElementById("frmEventos");

function editar(tareaId,codigoTarea,nombreT,nombreCliente, descripcion, fechaCreacion, fechaFinalizacion) {
  document.getElementById("eTareaId").value = tareaId;
  document.getElementById("eCodigoTarea").value = codigoTarea ;
  document.getElementById("eNombreT").value = nombreT;
  document.getElementById("eNombreCliente").value =nombreCliente ;
  document.getElementById("eDescripcion").value = descripcion;
  document.getElementById("eFechaCreacion").value = fechaCreacion;
  document.getElementById("eFechaFinalizacion").value = fechaFinalizacion;
  modalEditar.show();
}

formulario.addEventListener("submit", function (e) { 
  e.preventDefault();

  var tareaId = document.getElementById("eTareaId").value;
  var codigoTarea = document.getElementById("eCodigoTarea").value;
  var nombreT = document.getElementById("eNombreT").value;
  var nombreCliente = document.getElementById("eNombreCliente").value;
  var descripcion = document.getElementById("eDescripcion").value;
  var fechaCreacion = document.getElementById("eFechaCreacion").value;
  var fechaFinalizacion = document.getElementById("eFechaFinalizacion").value;
  
  

  var datosenviar = {
    tareaId: tareaId,
    codigoTarea: codigoTarea,
    nombreT: nombreT,
    nombreCliente: nombreCliente,
    descripcion: descripcion,
    fechaCreacion: fechaCreacion,
    fechaFinalizacion: fechaFinalizacion
   
  };
  console.log(datosenviar);
  fetch("https://localhost:7203/TareaPendiente/EditarTareaP", {
    method: "PUT",
    headers: { "content-type": "application/json " },
    body: JSON.stringify(datosenviar),
  }) //url de peticion de datos
    .then((respuesta) => {
      console.log(respuesta.status);
      if (respuesta.status == 204) {
        document.getElementById("tareaId").value = "";
        document.getElementById("codigoTarea").value = "" ;
        document.getElementById("nombreT").value = "";
        document.getElementById("nombreCliente").value = "" ;
        document.getElementById("descripcion").value = "";
        document.getElementById("fechaCreacion").value = "";
        document.getElementById("fechaFinalizacion").value = "";

        
        swal(
          "Se ha modificado correctamente!",
          "Presiona el boton!",
          "success"
        )
        .then((willDelete) => {
          if (willDelete) {
      
            modalEditar.hide();
            cargarTareaP();
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
function eliminar(tareaId) {
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {

      console.log(tareaId);
      
      fetch(
        "https://localhost:7203/TareaPendiente/BorrarTareaP/" + tareaId,
        {
          method: "DELETE"
          
        }
      ) //url de peticion de datos
      .then(datosrepuesta => {
        console.log(datosrepuesta.status); 
        if(datosrepuesta.status == 204){
          swal("¡Tarea Pendiente Eliminada!", "La tarea se ha eliminado correctamente.", "success");
      
          cargarTareaP();
     
        }else{
          swal("No se borraron los datos");
        }
      })
      .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    } 
  });


}

