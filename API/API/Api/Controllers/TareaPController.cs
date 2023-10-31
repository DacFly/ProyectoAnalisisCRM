using Api.Modelo;
using APIGestion.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{

    [ApiController]
    [Route("TareaPendiente")]
    public class TareaPController : Controller
    {
        private readonly Context _context;

        public TareaPController(Context context)
        {
            _context = context;
        }


        // GET: api/Usuarios
        [HttpGet]
        [Route("listaTareasPendientes")]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            var tareaP = await _context.TareaPendiente.ToListAsync();
            return Ok(tareaP);
        }

        // GET: api/Usuarios/5
        [HttpGet]
        [Route("BuscarTareaP/{id}")]
        public async Task<ActionResult<Cliente>> GetTareaP(int id)
        {
            var tareaP = await _context.TareaPendiente.FindAsync(id);

            if (tareaP == null)
            {
                return NotFound();
            }

            return Ok(tareaP);
        }
        
        // POST: api/Usuarios
        [HttpPost]
        [Route("CrearTareaP")]
        public async Task<ActionResult<TareaPendiente>> CreateTareaP(TareaPendiente tareaP)
        {
            _context.TareaPendiente.Add(tareaP);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTareaP), new { id = tareaP.TareaId }, tareaP);
        }

        // PUT: api/Usuarios/5
        [HttpPut]
        [Route("EditarTareaP")]
        public async Task<IActionResult> UpdateTareaP(TareaPendiente tareaP)
        {
            _context.Entry(tareaP).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TareaPExists(tareaP.TareaId))
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
        [Route("BorrarTareaP/{id}")]
        public async Task<IActionResult> DeleteTareaP(int id)
        {
            var tareaP = await _context.TareaPendiente.FindAsync(id);
            if (tareaP == null)
            {
                return NotFound();
            }

            _context.TareaPendiente.Remove(tareaP);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TareaPExists(int id)
        {
            return _context.TareaPendiente.Any(u => u.TareaId == id);
        }
    }
}
