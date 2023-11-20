using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;
using APIGestion.Data;
using Api.Modelo;

namespace Api.Controllers
{
    [ApiController]
    [Route("Cliente")]
    public class ClienteController : Controller
    {
        private readonly Context _context;

        public ClienteController(Context context)
        {
            _context = context;
        }


        // GET: api/Usuarios
        [HttpGet]
        [Route("listaClientes")]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            var clientes = await _context.Cliente.ToListAsync();
            return Ok(clientes);
        }

        // GET: api/Usuarios/5
        [HttpGet]
        [Route("BuscarCliente/{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _context.Cliente.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }
        [HttpGet]
        [Route("ClientePorNombre/{nombreBuscado}")]
        public IActionResult GetClientesPorNombre(string nombreBuscado)
        {
            if (string.IsNullOrWhiteSpace(nombreBuscado))
            {
                return BadRequest("El nombre de cliente no puede estar vacío.");
            }

            var clientes = _context.Cliente
                .FromSqlRaw("EXEC BuscarClientePorNombre @NombreBuscado", new SqlParameter("NombreBuscado", nombreBuscado))
                .ToList();

            return Ok(clientes);
        }


        // POST: api/Usuarios
        [HttpPost]
        [Route("CrearCliente")]
        public async Task<ActionResult<Cliente>> CreateCliente(Cliente cliente)
        {
            _context.Cliente.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.ClienteId }, cliente);
        }

        // PUT: api/Usuarios/5
        [HttpPut]
        [Route("EditarCliente")]
        public async Task<IActionResult> UpdateUsuario(Cliente cliente)
        {
            _context.Entry(cliente).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(cliente.ClienteId))
                {
                    return NotFound();
                }
                else
                {

                }
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Usuarios/5
        [HttpDelete]
        [Route("BorrarCliente/{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var cliente = await _context.Cliente.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Cliente.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteExists(int id)
        {
            return _context.Cliente.Any(u => u.ClienteId == id);
        }
    }
}
