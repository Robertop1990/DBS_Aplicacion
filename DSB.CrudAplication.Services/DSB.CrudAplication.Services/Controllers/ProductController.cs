using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DSB.CrudAplication.Services.Data;
using DSB.CrudAplication.Services.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DSB.CrudAplication.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly CrudAplicationContext _context;
        private readonly IDataRepository<Product> _repository;

        public ProductController(CrudAplicationContext context, IDataRepository<Product> repository)
        {
            _context = context;
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<Product> GetProducts()

        {
            return _context.Products.OrderByDescending(x => x.Id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct([FromRoute] int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product is null) return NotFound();

            return product;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id) return BadRequest();

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!ProductExist(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product is null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExist(int id)
        {
            return _context.Products.Any(x => x.Id == id);
        }

    }
}