﻿using System.Collections.Generic;
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

        private void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DreamCategory>().HasData(
               new[] { "Chcę dostać", "Chcę poznać", "Chcę pojechać", "Chcę kimś się stać", "Chcę komuś coś dać" }.Select((name, index) => new DreamCategory
               {
                   DreamCategoryId = index + 1,
                   CategoryName = name,
               }));

            modelBuilder.Entity<User>().HasData(new User { FirstName = "admin", LastName = "admin", Email = "admin@admin.pl", UserId = 1, Role = UserRoleEnum.Admin });
            modelBuilder.Entity<User>().HasData(new User { FirstName = "volunteer", LastName = "volunteer", Email = "volunteer@volunteer.pl", UserId = 2, Role = UserRoleEnum.Volunteer });

            modelBuilder.Entity<Dreamer>().HasData(new Dreamer
            {
                DreamerId = 1,
                Age = 35,
                DreamUrl = "http://google.com",
                FirstName = "Łukasz",
                LastName = "Wójcik",
                Gender = GenderEnum.Male
            });

            modelBuilder.Entity<Dream>().HasData(new Dream { DreamId = 1, DreamerId = 1, DreamCategoryId = 1, Tags = "#fromSeed", });
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DreamCategory>().HasMany(c => c.Dreams).WithOne(d => d.DreamCategory);
            modelBuilder.Entity<Dream>().HasMany(d => d.RequiredSteps).WithOne(s => s.Dream);

            modelBuilder.Entity<AssignedDreams>().HasKey(ad => new { ad.DreamId, ad.VolunteerId });

            SeedData(modelBuilder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Dreamer> Dreamers { get; set; }

        public DbSet<Dream> Dreams { get; set; }

        public DbSet<DreamCategory> DreamCategories { get; set; }

        public DbSet<DreamStep> DreamSteps { get; set; }

        public DbSet<AssignedDreams> AssignedDreams { get; set; }
    }
}
