var btn = document.getElementById('btn');

function logueo(){
            // Datos del formulario
            var correo =document.getElementById("user").value;
            var contrasena = document.getElementById("pass").value;
console.log(correo+""+contrasena);
            // Objeto de configuración para la solicitud 
    fetch("https://localhost:7203/Usuario/Login/"+correo+"/"+contrasena,
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(respuesta => respuesta.json())
    .then(respuesta =>{
        var usuario =respuesta;
        if(usuario.rol !== undefined ){
        sessionStorage.setItem("sesion","true");
        sessionStorage.setItem("rol",usuario.rol);
        sessionStorage.setItem("nombre",usuario.nombre);
        sessionStorage.setItem("sesion","true"); 
        sessionStorage.setItem("id",usuario.usuarioId);
        window.location.href="index.html";
        }else{ 
            swal("Error:El nombre de usuario o contraseña incorrecta", {
            icon: "error",
          });
        }
       
    }).catch(console.log)
    
}

(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (!form.checkValidity()) {
                    event.stopPropagation();
                }
                else {
                    logueo();
                }
                form.classList.add('was-validated')
            }, false)
        })
})();
