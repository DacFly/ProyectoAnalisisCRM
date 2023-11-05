//esta es la tabla que esta en la html 
var contenidoTablaResultado = document.querySelector("#resultados");
//modal para crear eventos
var modalCrearProducto = new bootstrap.Modal(document.getElementById('modalCrearProducto'))
//campo de texto para busqueda de la cedula
const input = document.getElementById("inputNombre");


function cargarProductos(){
  fetch(
    "https://localhost:7203/Producto/listaProductos",
    {
      method: "GET",
    }
  )
    .then((productos) => productos.json())
    .then((jsonProductos) => {
      contenidoTablaResultado.innerHTML = ``;
      console.log(jsonProductos)
      for (const producto of jsonProductos) {
        contenidoTablaResultado.innerHTML += `
              <tr class="table-primary" >
                  <td>${producto.productoId}</td>
                  <td>${producto.codProducto}</td>
                  <td>${producto.nombreProducto}</td>
                  <td>${producto.descripcionProducto}</td>
                  <td>${producto.precioProducto}</td>
                  <td>
                    <a name="" id="" class="btn btn-info" onclick="editar(${sessionStorage.getItem("id")},'${producto.ProductoId}', '${producto.CodProducto}', '${producto.NombreProducto}', '${producto.DescripcionProducto}', '${producto.PrecioProducto}')" role="button">Editar</a>
                    <a name="" id="" class="btn btn-danger" onclick="eliminar('${producto.ProductoId}')" role="button">Eliminar</a>
                  </td>
              </tr>`;
      }
    })
    .catch((error) => {
      // Aquí puedes manejar los errores de la solicitud
      console.error(error);
    });
}
cargarProductos();
// Agrega un oyente de eventos al input ESTO AÚN NO PUEDO



function mostrarModalCrearProducto() {
  modalCrearProducto.show();
}
function cerrarModalCrearProducto() {
  modalCrearProducto.hide();
}


function creaProducto(){
  //captura los datos de la interfaz 
  var codProducto = document.getElementById('codProducto').value;
  var nombreProducto = document.getElementById('nombreProducto').value;
  var descripcionProducto = document.getElementById('descripcionProducto').value;
  var precioProducto = document.getElementById('precioProducto').value;
  

  //jsopn para la solicitud 
  var producto = {
    productoId: 0, // Cambiar el valor del usuarioId según corresponda
    codProducto: codProducto,
    nombreProducto: nombreProducto,
    descripcionProducto: descripcionProducto,
    precioProducto: precioProducto
  };

  // Realizar la solicitud POST a la API para crear el evento
  fetch('https://localhost:7203/Producto/CrearProducto', {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(producto)
  }).then(response => {
    if(response.status==201)
    {
    swal("¡Producto Agregado!", "El producto se ha agregado correctamente.", "success");
    cargarProductos();
      document.getElementById('codProducto').value = '';
      document.getElementById('nombreProducto').value = '';
      document.getElementById('descripcionProducto').value = '';
      document.getElementById('precioProducto').value = '';
      cerrarModalCrearProducto()
    }else{swal("Error", "Ocurrió un error al agregar el producto. Por favor, inténtalo nuevamente.", "error")}
  })
    .catch(console.log);
}


//EDITAR CLIENTE

function cerrarModalModificarProducto(){
  modalEditar.hide();
}

const modalEditar = new bootstrap.Modal(
  document.getElementById("modalEditarProducto")
);
var formulario = document.getElementById("frmEventos");

function editar(
    productoId,
    codProducto, 
    nombreProducto, 
    descripcionProducto,
    precioProducto
) {
  document.getElementById("productoId").value = productoId;
  document.getElementById("codProducto").value = codProducto;
  document.getElementById("nombreProducto").value = nombreProducto;
  document.getElementById("descripcionProducto").value = descripcionProducto;
  document.getElementById("precioProducto").value = precioProducto;
  modalEditar.show();
}

formulario.addEventListener("submit", function (e) { 
  e.preventDefault();

  var codProducto = document.getElementById("codProducto").value;
  var nombreProducto = document.getElementById("nombreProducto").value;
  var descripcionProducto = document.getElementById("descripcionProducto").value;
  var precioProducto = document.getElementById("precioProducto").value;
  var id = parseInt(sessionStorage.getItem("id"));
  
  

  var datosenviar = {
    productoId: productoId,
    codProducto: codProducto,
    nombreProducto: nombreProducto,
    descripcionProducto: descripcionProducto,
    precioProducto: precioProducto

  };
  console.log(datosenviar);
  fetch("https://localhost:7203/Producto/EditarProducto", {
    method: "PUT",
    headers: { "content-type": "application/json " },
    body: JSON.stringify(datosenviar),
  }) //url de peticion de datos
    .then((respuesta) => {
      console.log(respuesta.status);
      if (respuesta.status == 204) {
        document.getElementById("codProducto").value = "";
        document.getElementById("nombreProducto").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("descripcionProducto").value = "";
        document.getElementById("precioProducto").value = "";

        
        swal(
          "Se ha modificado correctamente!",
          "Presiona el boton!",
          "success"
        )
        .then((willDelete) => {
          if (willDelete) {
      
            modalEditar.hide();
            cargarEventos2();
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
function eliminar(productoId) {
  swal({
    title: "Esta seguro que quiere eliminarlo?",
    text: "Una vez borrado no se podra recuperar los datos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {

      console.log(productoId);
      var productoId = parseInt(sessionStorage.getItem("id"));
      fetch(
        "https://localhost:7203/Producto/BorrarProducto/" + productoId,
        {
          method: "DELETE"
          
        }
      ) //url de peticion de datos
        .then(datosrepuesta => { 
          if(datosrepuesta.status == 200){
            swal("Eliminado correctamente", {
              icon: "success",
            });
            cargarEventos2();
            window.location = "Producto.html";
          }else{
            swal("No se borraron los datos");
          }
        })
        .catch(console.log); //muestra errores
      //Muestra el resultado de la peticion
    } 
  });

  var datosenviar = {
    productoId: productoId,
  };

}