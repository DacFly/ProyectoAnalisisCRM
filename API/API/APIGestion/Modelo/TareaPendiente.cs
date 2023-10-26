using System.ComponentModel.DataAnnotations;

namespace APIGestion.Modelo
{
    public class TareaPendiente
    {

        [Key]
        public int TareaId { get; set; }
        public int ClienteId { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaFinalizacion { get; set; }
    }
}
