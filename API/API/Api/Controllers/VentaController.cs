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
            var ventas = await _context.Venta.ToListAsync();
            return Ok(ventas);
        }

        // GET: Venta/BuscarVenta/5
        [HttpGet]
        [Route("BuscarVenta/{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Venta.FindAsync(id);

            if (venta == null)
            {
                return NotFound();
            }

            return Ok(venta);
        }


        [HttpGet]
        [Route("BuscarVentaPorCodFactura/{codFactura}")]
        public IActionResult GetVentaPorCodFactura(int codFactura)
        {
            var venta = _context.Venta.FirstOrDefault(v => v.CodFactura == codFactura);

            if (venta == null)
            {
                return NotFound();
            }

            return Ok(venta);
        }

        // POST: Venta/CrearVenta
        [HttpPost]
        [Route("CrearVenta")]
        public async Task<ActionResult<Venta>> CreateVenta(Venta venta)
        {
            _context.Venta.Add(venta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVenta), new { id = venta.CodFactura }, venta);
        }

        // PUT: Venta/EditarVenta
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
            var venta = await _context.Venta.FindAsync(id);
            if (venta == null)
            {
                return NotFound();
            }

            _context.Venta.Remove(venta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VentaExists(int id)
        {
            return _context.Venta.Any(v => v.CodFactura == id);
        }
    }
}