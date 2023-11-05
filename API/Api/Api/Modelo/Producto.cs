using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class Producto
    {
        [Key]

        public int ProductoId { get; set; }
        public int CodProducto { get; set; }

        public string NombreProducto { get; set; }

        public string DescripcionProducto { get; set; }

        public int PrecioProducto { get; set; }
    }
}
