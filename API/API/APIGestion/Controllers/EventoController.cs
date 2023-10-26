using APIGestion.Data;
using APIGestion.Modelo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace APIGestion.Controllers
{

    [ApiController]
    [Route("Evento")]
    public class EventoController : Controller
    {
        private readonly Context _context;

        public EventoController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("eventosNoInscritos/{usuarioId}")]
        public IActionResult GetEventosPorUsuario(int usuarioId)
        {
            var eventos = _context.Evento
                                .FromSqlRaw("EXECUTE GetEventosSinAsignarPorUsuario @UsuarioId", new SqlParameter("@UsuarioId", usuarioId))
                                .AsEnumerable() // Realiza la composición en el lado del cliente
                                .ToList();

            // Realiza cualquier procesamiento adicional con los eventos obtenidos

            return Ok(eventos);
        }
        [HttpGet]
        [Route("eventosDeUsuario/{usuarioId}")]
        public IActionResult eventosDeUsuario(int usuarioId)
        {
            var eventos = _context.Evento.Where(e => e.UsuarioId == usuarioId).ToList();

            if (eventos == null || eventos.Count == 0)
            {
                return NotFound();
            }

            return Ok(eventos);
        }

        // GET: api/Eventos
        [HttpGet]
        [Route("listaEventos")]
        public async Task<ActionResult<IEnumerable<Evento>>> GetEventos()
        {
            var eventos = await _context.Evento.ToListAsync();
            return Ok(eventos);
        }

        // GET: api/Eventos/5
        [HttpGet]
        [Route("EventoId/{idEvento}/{idUsuario}")]
        public async Task<ActionResult<Evento>> GetEvento(int idEvento, int idUsuario)
        {
            var evento = await _context.Evento.FindAsync(idEvento, idUsuario);

            if (evento == null)
            {
                return NotFound();
            }

            return Ok(evento);
        }

        // POST: api/Eventos
        [HttpPost]
        [Route("CrearEvento")]
        public async Task<ActionResult<Evento>> CreateEvento(Evento evento)
        {
            _context.Evento.Add(evento);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEvento), new { idEvento = evento.IdEvento, idUsuario = evento.UsuarioId }, evento);
        }


        [HttpPut("EditarEvento")]
        public async Task<IActionResult> UpdateEvento([FromBody] Evento evento)
        {
            var existingEvento = await _context.Evento.FindAsync(evento.IdEvento, evento.UsuarioId);

            if (existingEvento == null)
            {
                return NotFound();
            }

            _context.Entry(existingEvento).CurrentValues.SetValues(evento);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventoExists(existingEvento))
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
        [HttpDelete("EliminarEvento/{idEvento}/{idUsuario}")]
        public async Task<IActionResult> DeleteEvento(int idEvento, int idUsuario)
        {
            var evento = await _context.Evento.FindAsync(idEvento, idUsuario);
            if (evento == null)
            {
                return NotFound();
            }

            _context.Evento.Remove(evento);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool EventoExists(Evento evento)
        {
            return _context.Evento.Any(e => e.IdEvento == evento.IdEvento && e.UsuarioId == evento.UsuarioId);
        }
        private bool EventoExists(int id)
        {
            return _context.Evento.Any(e => e.IdEvento == id);
        }

        [HttpGet]
        [Route("ObtenerEventosPorUsuario/{usuarioId}")]
        public IActionResult ObtenerEventosPorUsuario(int usuarioId)
        {
            try
            {
                var eventos = _context.Evento
                    .FromSqlRaw("EXECUTE GetEventosPorUsuario @UsuarioId", new SqlParameter("@UsuarioId", usuarioId))
                    .ToList();

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener los eventos por usuario: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteEvento/{id}")]
        public void deleteMenu(int id)
        {
            var temp = this._context.Evento.FirstOrDefault(u => u.IdEvento == id);
            this._context.Remove(temp);
            this._context.SaveChanges();
        }

        [HttpGet("Asistentes/{idEvento}")]
        public async Task<ActionResult<List<Usuario>>> GetUsuariosAsistentes(int idEvento)
        {
            try
            {
                List<int> usuariosAsistentesIds = await _context.EventoUsuario
                    .Where(eu => eu.IdEvento == idEvento)
                    .Select(eu => eu.UsuarioId)
                    .ToListAsync();

                List<Usuario> usuariosAsistentes = await _context.Usuario
                    .Where(u => usuariosAsistentesIds.Contains(u.UsuarioId))
                    .ToListAsync();

                return Ok(usuariosAsistentes);
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción
                return StatusCode(500, "Error al obtener los usuarios asistentes");
            }
        }
    }

}
