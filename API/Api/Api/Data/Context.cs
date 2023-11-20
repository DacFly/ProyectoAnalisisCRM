using Api.Modelo;
using Microsoft.EntityFrameworkCore;

namespace APIGestion.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<DetalleVenta> DetalleVenta { get; set; }
        public DbSet<Preferencia> Preferencia { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<TareaPendiente> TareaPendiente { get; set; }
        public DbSet<Venta> Venta { get; set; }
        public DbSet<Cliente> Cliente { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DetalleVenta>()
                .HasNoKey();
        }
    }
}
