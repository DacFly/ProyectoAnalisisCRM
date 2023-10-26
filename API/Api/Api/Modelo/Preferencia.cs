using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class Preferencia
    {
        [Key]
        public int IdPreferencia { get; set; }

        public string ClienteId { get; set; }

        public string Nombre { get; set; }

        public string nombreProducto { get; set; }

        public string Descripcion { get; set; }

    }
}



