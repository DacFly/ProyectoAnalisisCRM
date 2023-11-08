using Api.Modelo;
using APIGestion.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Api.Controllers
{
    [ApiController]
    [Route("Preferencia")]
    public class PreferenciasController : Controller
    {
        private readonly Context _context;

        public PreferenciasController(Context context)
        {
            _context = context;
        }


        // GET: api/Usuarios
        [HttpGet]
        [Route("listaPreferencias")]
        public async Task<ActionResult<IEnumerable<Preferencia>>> GetPreferencias()
        {
            var preferencias = await _context.Preferencia.ToListAsync();
            return Ok(preferencias);
        }

        // GET: api/Usuarios/5
        [HttpGet]
        [Route("BuscarPreferencia/{id}")]
        public async Task<ActionResult<Preferencia>> GetPreferencia(int id)
        {
            var preferencia = await _context.Producto.FindAsync(id);

            if (preferencia == null)
            {
                return NotFound();
            }

            return Ok(preferencia);
        }

        [HttpGet]
        [Route("PreferenciasPorNombre/{nombreBuscado}")]
        public IActionResult GetClientesPorNombre(string nombreBuscado)
        {
            if (string.IsNullOrWhiteSpace(nombreBuscado))
            {
                return BadRequest("El nombre de cliente no puede estar vacío.");
            }

            var preferencia = _context.Preferencia
                .FromSqlRaw("EXEC BuscarPreferenciasPorNombre @NombreBuscado", new SqlParameter("NombreBuscado", nombreBuscado))
                .ToList();

            return Ok(preferencia);
        }


        // POST: api/Usuarios
        [HttpPost]
        [Route("CrearPreferencia")]
        public async Task<ActionResult<Preferencia>> CreatePreferencia(Preferencia preferencia)
        {
            _context.Preferencia.Add(preferencia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPreferencia), new { id = preferencia.IdPreferencia }, preferencia);
        }

        // PUT: api/Usuarios/5
        [HttpPut]
        [Route("EditarPreferencia")]
        public async Task<IActionResult> UpdatePreferencia(Preferencia preferencia)
        {
            _context.Entry(preferencia).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PreferenciaExists(preferencia.IdPreferencia))
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
        [Route("BorrarPreferencia/{id}")]
        public async Task<IActionResult> DeletePreferencia(int id)
        {
            var preferencia = await _context.Preferencia.FindAsync(id);
            if (preferencia == null)
            {
                return NotFound();
            }

            _context.Preferencia.Remove(preferencia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PreferenciaExists(int id)
        {
            return _context.Preferencia.Any(u => u.IdPreferencia == id);
        }
    }
}
