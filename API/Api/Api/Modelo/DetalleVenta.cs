using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Modelo
{
    public class DetalleVenta
    {
        [ForeignKey("Venta")]
        public int CodFactura { get; set; }

        [ForeignKey("Producto")]
        public int CodProducto { get; set; }

        public Venta Venta { get; set; }

        public Producto Producto { get; set; }
    }
}
