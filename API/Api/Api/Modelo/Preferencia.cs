using System.ComponentModel.DataAnnotations;

namespace Api.Modelo
{
    public class Preferencia
    {
        [Key]
        public int IdPreferencia { get; set; }

        public int CodigoPreferencia { get; set; }

        public string NombreCliente { get; set; }

        public string Descripcion { get; set; }

    }
}



