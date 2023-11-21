    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace Api.Modelo
    {
        public class Venta
        {
            [Key]
            public int CodFactura { get; set; }

            [Required]
            public int ClienteId { get; set; }

            [Required]
            public string NombreCliente { get; set; }

            [Required]
            public string CedulaCliente { get; set; }

            [Required]
            public int ProductoId { get; set; }

            [Required]
            public string NombreProducto { get; set; }
    
            [Required]
            public int CantidadProducto { get; set; }

            [Required]
            public decimal Subtotal { get; set; }

            [Required]
            public decimal IVA { get; set; }

            [Required]
            public decimal MontoTotal { get; set; }

            [Required]
            public DateTime FechaVenta { get; set; }
        }
    }