using Api.Modelo;
using APIGestion.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Api.Controllers
{
    [ApiController]
    [Route("Producto")]
    public class ProductoController : Controller
    {
        private readonly Context _context;

        public ProductoController(Context context)
        {
            _context = context;
        }


        // GET: api/Usuarios
        [HttpGet]
        [Route("listaProductos")]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            var productos = await _context.Producto.ToListAsync();
            return Ok(productos);
        }

        // GET: api/Usuarios/5
        [HttpGet]
        [Route("BuscarProducto/{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var productos = await _context.Producto.FindAsync(id);

            if (productos == null)
            {
                return NotFound();
            }

            return Ok(productos);
        }

        [HttpGet]
        [Route("ProductoPorID/{codProducto}")]
        public IActionResult GetProductoPorCodigo(string codProducto)
        {
            if (string.IsNullOrWhiteSpace(codProducto))
            {
                return BadRequest("El código del producto no puede estar vacío.");
            }

            var productos = _context.Producto
                .FromSqlRaw("EXEC BuscarProductoPorID @CodProducto", new SqlParameter("codProducto", codProducto))
                .ToList();

            return Ok(productos);
        }



        // POST: api/Usuarios
        [HttpPost]
        [Route("CrearProducto")]
        public async Task<ActionResult<Producto>> CreateProducto(Producto producto)
        {
            _context.Producto.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducto), new { id = producto.ProductoId }, producto);
        }

        // PUT: api/Usuarios/5
        [HttpPut]
        [Route("EditarProducto")]
        public async Task<IActionResult> UpdateProducto(Producto producto)
        {
            _context.Entry(producto).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(producto.CodProducto))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Usuarios/5
        [HttpDelete]
        [Route("BorrarProducto/{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Producto.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.Producto.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(int id)
        {
            return _context.Producto.Any(u => u.CodProducto == id);
        }
    }
}
