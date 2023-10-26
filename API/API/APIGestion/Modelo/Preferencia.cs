using System.ComponentModel.DataAnnotations;

namespace APIGestion.Modelo
{
    public class Preferencia
    {
        [Key]
        public int IdPreferencia { get; set; }

        public string ClienteId { get; set; }

        public string Nombre { get; set; }

        public string NombreProducto { get; set; }

        public string Descripcion { get; set; }

    }
}



