var contenido = document.querySelector("#menu");


contenido.innerHTML += `
<div class="container-fluid">

  <div class="row ">

    <div class="site-logo col-6">
      <a href="index.html"> <img src="images/logo.png" alt="Texto alternativo de la imagen" style="height: 100px;width: 140px">
      </a>
    </div>
    
    <nav class="mx-auto site-navigation">
      <ul class="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
      ${sessionStorage.getItem("rol") === "administrador" ? ' <li><a href="Usuarios.html" class="nav-link ">Usuarios</a></li>' : ''}
      ${sessionStorage.getItem("sesion") !== "false" ? '<li><a href="Clientes.html" class="nav-link ">Clientes</a></li>'+
      
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
  window.location.href = "index.html";
}




