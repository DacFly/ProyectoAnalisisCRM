using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class Cliente
    {
        [Key]
        public int ClienteId { get; set; }
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
    }
}
