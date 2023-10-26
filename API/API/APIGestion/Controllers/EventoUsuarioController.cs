using APIGestion.Data;
using APIGestion.Modelo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace APIGestion.Controllers
{
    [ApiController]
    [Route("EventoUsuario")]
    public class EventoUsuarioController : Controller
    {
        private readonly Context _context;

        public EventoUsuarioController(Context context)
        {
            _context = context;
        }
       
        // GET: api/eventosusuarios
        [HttpGet]
        [Route("listaEventoUsuario")]
        public ActionResult<IEnumerable<EventoUsuario>> GetEventosUsuarios()
        {
            var eventosUsuarios = _context.EventoUsuario.ToList();
            return Ok(eventosUsuarios);
        }

        // GET: api/eventosusuarios/eventoid/1/usuarioid/2
        [HttpGet]
        [Route("BuscarEvento/{eventoId}/{usuarioId}")]
        public ActionResult<EventoUsuario> GetEventoUsuario(int eventoId, int usuarioId)
        {
            var eventoUsuario = _context.EventoUsuario
                .FirstOrDefault(eu => eu.IdEvento == eventoId && eu.UsuarioId == usuarioId);

            if (eventoUsuario == null)
            {
                return NotFound();
            }

            return Ok(eventoUsuario);   
        }

        // POST: api/eventosusuarios
        [HttpPost]
        [Route("CrearEventoUsuario")]
        public ActionResult<EventoUsuario> CreateEventoUsuario(EventoUsuario eventoUsuario)
        {
            _context.EventoUsuario.Add(eventoUsuario);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetEventoUsuario),
                new { eventoId = eventoUsuario.IdEvento, usuarioId = eventoUsuario.UsuarioId },
                eventoUsuario);
        }

        // DELETE: api/eventosusuarios/eventoid/1/usuarioid/2
        [HttpDelete]
        [Route("ElimiarEventoUsuario/{eventoId}/{usuarioId}")]
        public ActionResult DeleteEventoUsuario(int eventoId, int usuarioId)
        {
            var eventoUsuario = _context.EventoUsuario
                .FirstOrDefault(eu => eu.IdEvento == eventoId && eu.UsuarioId == usuarioId);

            if (eventoUsuario == null)
            {
                return NotFound();
            }

            _context.EventoUsuario.Remove(eventoUsuario);
            _context.SaveChanges();

            return NoContent();
        }
    }

}


