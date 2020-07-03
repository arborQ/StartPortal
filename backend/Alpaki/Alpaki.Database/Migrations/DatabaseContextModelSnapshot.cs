﻿// <auto-generated />
using Alpaki.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Alpaki.Database.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Alpaki.Database.Models.Dream", b =>
                {
                    b.Property<long>("DreamId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("DreamCategoryId")
                        .HasColumnType("bigint");

                    b.Property<long>("DreamerId")
                        .HasColumnType("bigint");

                    b.Property<string>("Tags")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DreamId");

                    b.HasIndex("DreamCategoryId");

                    b.HasIndex("DreamerId");

                    b.ToTable("Dreams");

                    b.HasData(
                        new
                        {
                            DreamId = 1L,
                            DreamCategoryId = 1L,
                            DreamerId = 1L,
                            Tags = "#fromSeed"
                        });
                });

            modelBuilder.Entity("Alpaki.Database.Models.DreamCategory", b =>
                {
                    b.Property<long>("DreamCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.HasKey("DreamCategoryId");

                    b.ToTable("DreamCategories");

                    b.HasData(
                        new
                        {
                            DreamCategoryId = 1L,
                            CategoryName = "Chcę dostać"
                        },
                        new
                        {
                            DreamCategoryId = 2L,
                            CategoryName = "Chcę poznać"
                        },
                        new
                        {
                            DreamCategoryId = 3L,
                            CategoryName = "Chcę pojechać"
                        },
                        new
                        {
                            DreamCategoryId = 4L,
                            CategoryName = "Chcę kimś się stać"
                        },
                        new
                        {
                            DreamCategoryId = 5L,
                            CategoryName = "Chcę komuś coś dać"
                        });
                });

            modelBuilder.Entity("Alpaki.Database.Models.Dreamer", b =>
                {
                    b.Property<long>("DreamerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("DreamerId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Dreamers");

                    b.HasData(
                        new
                        {
                            DreamerId = 1L,
                            Age = 35,
                            Gender = 1,
                            UserId = 1L
                        });
                });

            modelBuilder.Entity("Alpaki.Database.Models.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)")
                        .HasMaxLength(250);

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1L,
                            FirstName = "admin",
                            LastName = "admin",
                            Login = "admin"
                        });
                });

            modelBuilder.Entity("Alpaki.Database.Models.Dream", b =>
                {
                    b.HasOne("Alpaki.Database.Models.DreamCategory", "DreamCategory")
                        .WithMany("Dreams")
                        .HasForeignKey("DreamCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Alpaki.Database.Models.Dreamer", "Dreamer")
                        .WithMany("Dreams")
                        .HasForeignKey("DreamerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Alpaki.Database.Models.Dreamer", b =>
                {
                    b.HasOne("Alpaki.Database.Models.User", "User")
                        .WithOne("Dreamer")
                        .HasForeignKey("Alpaki.Database.Models.Dreamer", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
