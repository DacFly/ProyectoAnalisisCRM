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
        public DbSet<EventoUsuario> EventoUsuario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventoUsuario>()
               .HasKey(e => new { e.UsuarioId, e.IdEvento });
        }
    }
}
