using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class DetalleVenta
    {
        [Key]
        public int CodFactura { get; set; }

        public int CodProducto { get; set; }

    }
}
