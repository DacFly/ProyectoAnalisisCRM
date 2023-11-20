using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class Producto
    {
        [Key]
        public int ProductoId { get; set; }

        [Required]
        public int CodProducto { get; set; }

        [Required]
        public string NombreProducto { get; set; }

        [Required]
        public string DescripcionProducto { get; set; }

        [Required]
        public decimal PrecioProducto { get; set; }

        [Required]
        public int Cantidad { get; set; }
    }
}
