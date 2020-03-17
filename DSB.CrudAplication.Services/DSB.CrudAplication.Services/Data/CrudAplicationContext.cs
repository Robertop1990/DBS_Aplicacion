using DSB.CrudAplication.Services.Data.EntityConfiguration;
using DSB.CrudAplication.Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DSB.CrudAplication.Services.Data
{
    public class CrudAplicationContext:DbContext
    {
        public CrudAplicationContext(DbContextOptions<CrudAplicationContext> options):base(options){}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
        }
        public DbSet<Product> Products { get; set; }
    }
}
