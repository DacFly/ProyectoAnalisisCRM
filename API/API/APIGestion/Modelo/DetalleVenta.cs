using System.ComponentModel.DataAnnotations;

namespace APIGestion.Modelo
{
    public class DetalleVenta
    {
        [Key]
        public int CodFactura { get; set; }

        public int CodProducto { get; set; }

    }
}
