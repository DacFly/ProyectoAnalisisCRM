using System.ComponentModel.DataAnnotations;

namespace APIGestion.Modelo
{
    public class EventoUsuario
    {
        [Key]
        public int IdEvento { get; set; }

        [Key]
        public int UsuarioId { get; set; }
    }
}
