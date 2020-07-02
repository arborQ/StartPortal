using Alpaki.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Alpaki.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DreamCategory>().HasMany(c => c.Dreams).WithOne(d => d.DreamCategory);
        }

        public DbSet<Dreamer> Dreamers { get; set; }

        public DbSet<DreamCategory> DreamCategories { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Dream> Dreams { get; set; }
    }
}
