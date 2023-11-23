var cardContainer = document.getElementById('card-container');

function validateLogin() {
  console.log("hola 1")
  if (sessionStorage.getItem("sesion") == null || sessionStorage.getItem("sesion") == "false") {
    console.log("hola 2")
    sessionStorage.setItem("sesion","false");
  } 
}

validateLogin();  

function cargarEventos() {
  fetch("https://localhost:7088/Evento/eventosNoInscritos/" + sessionStorage.getItem("id"), {
    method: 'GET'
  })
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
      cardContainer.innerHTML = ``;
      for (const ev of datos) {
        cardContainer.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card" style="width: 20rem;">
            <div class="card-body">
              <h5 class="card-title">${ev.titulo}</h5>
              <p class="card-text">${ev.descripcion}d</p>
            </div>
            <ul class="list-group list-group-flush">  
              <li class="list-group-item">Fecha del Evento:${ev.fechaEvento.split("T")[0]} </li>
              <li class="list-group-item">Fecha Finalizacion:${ev.fechaEvento.split("T")[0]} </"li>
              <li class="list-group-item">Hora: ${ev.hora}</li>
              <li class="list-group-item">Dirección: ${ev.direccion} </li>
            </ul>
            <div class="card-body">
              <button class="btn btn-primary" type="button " onclick="AsistirEvento(${ev.idEvento},${sessionStorage.getItem("id")})">Inscribirse</button>
              ${sessionStorage.getItem("rol") === "admin" ? '<button class="btn  btn-danger" type="button"" onclick="eliminarEvento(' + ev.idEvento + ',' + ev.usuarioId + ')">Eliminar</button>' : ''}

            </div>
          </div>  
        </div>
        `;
      }
    })
    .catch(error => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    })
}

function eliminarEvento(idEvento, idUsuario) {
  console.log(idUsuario);
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      fetch("https://localhost:7088/Evento/EliminarEvento/" + parseInt(idEvento) + "/" + parseInt(idUsuario),
        {
          method: "DELETE"
        })
        .then(datosrepuesta => {
          if (datosrepuesta.status == 204) {
            swal({
              title: "Eliminado correctamente",
              icon: "success",
              button:false,
              timer: 1000,
            });
            cargarEventos();
          } else {
            swal("No se borraron los datos");
          }
        })
        .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    }
  });
}
function AsistirEvento(idEvento, idUsuario) {
  var jsonData = {
    "idEvento": parseInt(idEvento),
    "usuarioId": parseInt(idUsuario)
  };
  console.log(jsonData)

  fetch("https://localhost:7088/EventoUsuario/CrearEventoUsuario", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(response => {
      swal({
        title: "Inscrito correctamente",
        icon: "success",
        button:false,
        timer: 1000,
      });
      cargarEventos();

    })
    .catch(error => {
      console.error("Error:", error);
    });
}
cargarEventos();

