using APIGestion.Data;
using APIGestion.Modelo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIGestion.Controllers
{
    [ApiController]
    [Route("Usuario")]
    public class UsuarioController : Controller
    {
        private readonly Context _context;

        public UsuarioController(Context context)
        {
            _context = context;
        }
        [HttpPut]
        [Route("Login/{correo}/{contrasena}")]
        public async Task<IActionResult> Login(string correo, string contrasena)
        {
            // Verificar si el usuario existe en la base de datos
            var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.Email == correo && u.Password == contrasena);

            if (usuario == null)
            {
                return NotFound(); // Usuario no encontrado
            }

            // Realizar acciones adicionales según tus necesidades (por ejemplo, generar token de autenticación)

            return Ok(usuario); // Devolver el usuario en caso de inicio de sesión exitoso
        }
        // GET: api/Usuarios
        [HttpGet]
        [Route("listaUsuario")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            var usuarios = await _context.Usuario.ToListAsync();
            return Ok(usuarios);
        }

        // GET: api/Usuarios/5
        [HttpGet]
        [Route("BuscarUsuario/{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        // POST: api/Usuarios
        [HttpPost]
        [Route("CrearUsuario")]
        public async Task<ActionResult<Usuario>> CreateUsuario(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.UsuarioId }, usuario);
        }

        // PUT: api/Usuarios/5
        [HttpPut]
        [Route("EditarUsuario")]
        public async Task<IActionResult> UpdateUsuario( Usuario usuario)
        {
           

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(usuario.UsuarioId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Usuarios/5
        [HttpDelete]
        [Route("BorrarUsuario/{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuario.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuario.Any(u => u.UsuarioId == id);
        }
    }
}
