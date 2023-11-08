using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class TareaPendiente
    {

        [Key]
        public int TareaId { get; set; }

        public int CodigoTarea { get; set; }

        public string NombreT { get; set; }
        public string NombreTrabajador { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaFinalizacion { get; set; }
    }
}
