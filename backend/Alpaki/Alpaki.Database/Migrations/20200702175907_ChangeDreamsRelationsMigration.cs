using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpaki.Database.Migrations
{
    public partial class ChangeDreamsRelationsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DreamCategories",
                columns: table => new
                {
                    DreamCategoryId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DreamCategories", x => x.DreamCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(maxLength: 250, nullable: false),
                    FirstName = table.Column<string>(maxLength: 250, nullable: false),
                    LastName = table.Column<string>(maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Dreamers",
                columns: table => new
                {
                    DreamerId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Age = table.Column<byte>(nullable: false),
                    Gender = table.Column<int>(nullable: false),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dreamers", x => x.DreamerId);
                    table.ForeignKey(
                        name: "FK_Dreamers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dreams",
                columns: table => new
                {
                    DreamId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tags = table.Column<string>(nullable: true),
                    DreamerId = table.Column<long>(nullable: false),
                    DreamCategoryId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dreams", x => x.DreamId);
                    table.ForeignKey(
                        name: "FK_Dreams_DreamCategories_DreamCategoryId",
                        column: x => x.DreamCategoryId,
                        principalTable: "DreamCategories",
                        principalColumn: "DreamCategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dreams_Dreamers_DreamerId",
                        column: x => x.DreamerId,
                        principalTable: "Dreamers",
                        principalColumn: "DreamerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dreamers_UserId",
                table: "Dreamers",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dreams_DreamCategoryId",
                table: "Dreams",
                column: "DreamCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Dreams_DreamerId",
                table: "Dreams",
                column: "DreamerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dreams");

            migrationBuilder.DropTable(
                name: "DreamCategories");

            migrationBuilder.DropTable(
                name: "Dreamers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
