using System.ComponentModel.DataAnnotations;

namespace APIGestion.Modelo
{
    public class Producto
    {
        [Key]
        public int CodProducto { get; set; }

        public string NombreProducto { get; set; }

        public string DescripcionProducto { get; set; }

        public int PrecioProducto { get; set; }
    }
}
