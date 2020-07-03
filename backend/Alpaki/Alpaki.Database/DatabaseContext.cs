using System.Linq;
using Alpaki.CrossCutting.Enums;
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

            modelBuilder.Entity<DreamCategory>().HasData(
               new[] { "Chcę dostać", "Chcę poznać", "Chcę pojechać", "Chcę kimś się stać", "Chcę komuś coś dać" }.Select((name, index) => new DreamCategory
               {
                   DreamCategoryId = index + 1,
                   CategoryName = name,
               }));

            modelBuilder.Entity<User>().HasData(new User { FirstName = "admin", LastName = "admin", Login = "admin", UserId = 1 });
            modelBuilder.Entity<Dreamer>().HasData(new Dreamer { DreamerId = 1, Age = 35, UserId = 1, Gender = GenderEnum.Male });
            modelBuilder.Entity<Dream>().HasData(new Dream { DreamId = 1, DreamerId = 1, DreamCategoryId = 1, Tags = "#fromSeed" });
        }

        public DbSet<Dreamer> Dreamers { get; set; }

        public DbSet<DreamCategory> DreamCategories { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Dream> Dreams { get; set; }
    }
}
