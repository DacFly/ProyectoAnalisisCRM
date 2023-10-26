﻿using System.ComponentModel.DataAnnotations;

namespace APIGestion.Modelo
{
    public class Venta
    {
        [Key]
        public int CodFactura { get; set; }

        public string Nombre { get; set; }

        public string Cedula { get; set; }

        public int Subtotal { get; set; }

        public int IVA { get; set; }

        public int MontoTotal { get; set; }

        public string FechaVenta { get; set; }
    }
}