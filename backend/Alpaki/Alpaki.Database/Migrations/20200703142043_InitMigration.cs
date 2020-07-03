using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpaki.Database.Migrations
{
    public partial class InitMigration : Migration
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
                    Age = table.Column<int>(nullable: false),
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

            migrationBuilder.InsertData(
                table: "DreamCategories",
                columns: new[] { "DreamCategoryId", "CategoryName" },
                values: new object[,]
                {
                    { 1L, "Chcę dostać" },
                    { 2L, "Chcę poznać" },
                    { 3L, "Chcę pojechać" },
                    { 4L, "Chcę kimś się stać" },
                    { 5L, "Chcę komuś coś dać" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "FirstName", "LastName", "Login" },
                values: new object[] { 1L, "admin", "admin", "admin" });

            migrationBuilder.InsertData(
                table: "Dreamers",
                columns: new[] { "DreamerId", "Age", "Gender", "UserId" },
                values: new object[] { 1L, 35, 1, 1L });

            migrationBuilder.InsertData(
                table: "Dreams",
                columns: new[] { "DreamId", "DreamCategoryId", "DreamerId", "Tags" },
                values: new object[] { 1L, 1L, 1L, "#fromSeed" });

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
