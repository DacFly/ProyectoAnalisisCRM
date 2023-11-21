using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIGestion.Data;
using Api.Modelo;

namespace Api.Controllers
{
    [ApiController]
    [Route("Venta")]
    public class VentaController : Controller
    {
        private readonly Context _context;

        public VentaController(Context context)
        {
            _context = context;
        }

        // GET: Venta/listaVentas
        [HttpGet]
        [Route("listaVentas")]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
        {
            var ventas = await _context.Venta
                .ToListAsync();

            // Mapear manualmente la información del cliente y producto para cada venta
            foreach (var venta in ventas)
            {
                var cliente = _context.Cliente.FirstOrDefault(c => c.ClienteId == venta.ClienteId);

                if (cliente != null)
                {
                    venta.NombreCliente = cliente.Nombre;
                    venta.CedulaCliente = cliente.Cedula;
                    // Mapear otras propiedades del cliente según sea necesario
                }

                var producto = _context.Producto.FirstOrDefault(p => p.ProductoId == venta.ProductoId);

                if (producto != null)
                {
                    venta.NombreProducto = producto.NombreProducto;
                    // Mapear otras propiedades del producto según sea necesario
                }
            }

            return Ok(ventas);
        }

        // GET: Venta/BuscarVenta/5
        [HttpGet]
        [Route("BuscarVenta/{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Venta
                .FirstOrDefaultAsync(v => v.CodFactura == id);

            if (venta == null)
            {
                return NotFound();
            }

            // Mapear manualmente la información del cliente y producto para la venta específica
            var cliente = _context.Cliente.FirstOrDefault(c => c.ClienteId == venta.ClienteId);

            if (cliente != null)
            {
                venta.NombreCliente = cliente.Nombre;
                venta.CedulaCliente = cliente.Cedula;
                // Mapear otras propiedades del cliente según sea necesario
            }

            var producto = _context.Producto.FirstOrDefault(p => p.ProductoId == venta.ProductoId);

            if (producto != null)
            {
                venta.NombreProducto = producto.NombreProducto;
                // Mapear otras propiedades del producto según sea necesario
            }

            return Ok(venta);
        }


        [HttpGet]
        [Route("BuscarVentaPorCodFactura/{codFactura}")]
        public IActionResult GetVentaPorCodFactura(int codFactura)
        {
            var venta = _context.Venta
                .FirstOrDefault(v => v.CodFactura == codFactura);

            if (venta == null)
            {
                return NotFound();
            }

            // Mapear manualmente la información del cliente
            var cliente = _context.Cliente.FirstOrDefault(c => c.ClienteId == venta.ClienteId);

            if (cliente != null)
            {
                venta.NombreCliente = cliente.Nombre;
                venta.CedulaCliente = cliente.Cedula;
                // Mapear otras propiedades del cliente según sea necesario
            }

            return Ok(venta);
        }


        // POST: Venta/CrearVenta
        [HttpPost]
        [Route("CrearVenta")]
        public async Task<ActionResult<Venta>> CreateVenta(Venta venta)
        {
            // Agrega la venta a la base de datos
            _context.Venta.Add(venta);
            await _context.SaveChangesAsync();

            // Recupera el producto correspondiente
            var producto = await _context.Producto.FindAsync(venta.ProductoId);

            if (producto != null)
            {
                // Ajusta la cantidad de productos
                producto.Cantidad -= venta.CantidadProducto;

                // Guarda los cambios en la base de datos
                await _context.SaveChangesAsync();
            }

            // Retorna la respuesta
            return CreatedAtAction(nameof(GetVenta), new { id = venta.CodFactura }, venta);
        }


        // PUT: api/Usuarios/5
        [HttpPut]
        [Route("EditarVenta")]
        public async Task<IActionResult> UpdateVenta(Venta venta)
        {
            _context.Entry(venta).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VentaExists(venta.CodFactura))
                {
                    return NotFound();
                }
                else
                {

                }
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: Venta/BorrarVenta/5
        [HttpDelete]
        [Route("BorrarVenta/{id}")]
        public async Task<IActionResult> DeleteVenta(int id)
        {
            try
            {
                // Buscar la venta por ID
                var venta = await _context.Venta.FindAsync(id);
                if (venta == null)
                {
                    return NotFound();
                }

                // Obtener el producto asociado a la venta
                var producto = await _context.Producto.FindAsync(venta.ProductoId);

                if (producto == null)
                {
                    return NotFound();
                }

                // Ajustar la cantidad de productos
                producto.Cantidad += venta.CantidadProducto;

                // Eliminar la venta
                _context.Venta.Remove(venta);

                // Guardar cambios en la base de datos
                await _context.SaveChangesAsync();

                // Devolver el producto actualizado
                return Ok(producto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Error interno del servidor");
            }
        }



        private bool VentaExists(int id)
        {
            return _context.Venta.Any(v => v.CodFactura == id);
        }

        [HttpGet]
        [Route("ListaClientes")]
        public IActionResult GetListaClientes()
        {
            var clientes = _context.Cliente.ToList();
            return Ok(clientes);
        }

        [HttpGet]
        [Route("ListaClientes/{id}")]
        public IActionResult GetClientePorId(int id)
        {
            var cliente = _context.Cliente.FirstOrDefault(c => c.ClienteId == id);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        [HttpGet]
        [Route("ListaProductos")]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            var productos = await _context.Producto.ToListAsync();
            return Ok(productos);
        }

        [HttpGet]
        [Route("ListaProductos/{id}")]
        public IActionResult GetProductoPorId(int id)
        {
            var producto = _context.Producto.FirstOrDefault(p => p.ProductoId == id);

            if (producto == null)
            {
                return NotFound();
            }

            // Devolver el producto con el precio y la cantidad
            return Ok(new { PrecioProducto = producto.PrecioProducto, Cantidad = producto.Cantidad });
        }

        [HttpGet("obtener-fecha-actual")]
        public IActionResult ObtenerFechaActual()
        {
            var fechaActual = DateTime.Now;
            return Ok(new { fecha = fechaActual });
        }

        [HttpGet]
        [Route("ObtenerInfoClienteProducto/{codFactura}")]
        public IActionResult ObtenerInfoClienteProducto(int codFactura)
        {
            var venta = _context.Venta.FirstOrDefault(v => v.CodFactura == codFactura);

            if (venta == null)
            {
                return NotFound(); // La venta no existe
            }

            var clienteId = venta.ClienteId;
            var productoId = venta.ProductoId;

            return Ok(new { ClienteId = clienteId, ProductoId = productoId });
        }





    }
}
