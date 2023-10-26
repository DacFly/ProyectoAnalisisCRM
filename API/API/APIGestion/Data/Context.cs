using APIGestion.Modelo;
using Microsoft.EntityFrameworkCore;

namespace APIGestion.Data
{
    public class Context :DbContext
    {
        public Context (DbContextOptions<Context> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuario { get; set; }

    }
}
