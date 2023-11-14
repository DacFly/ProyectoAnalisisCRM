using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; } 
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Contrasena { get; set; }
        public string Rol { get; set; }
    }
}
