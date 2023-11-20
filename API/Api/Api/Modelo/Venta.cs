using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class Venta
    {
        [Key]
        public int CodFactura { get; set; }

        [Required]
        public string NombreCliente { get; set; }

        [Required]
        public string CedulaCliente { get; set; }

        [Required]
        public decimal SubTotal { get; set; }

        [Required]
        public decimal IVA { get; set; }

        [Required]
        public decimal MontoTotal { get; set; }

        [Required]
        public DateTime FechaVenta { get; set; }

    }
}