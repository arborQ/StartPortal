using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpaki.Database.Migrations
{
    public partial class InitMigration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dreamers_Users_UserId",
                table: "Dreamers");

            migrationBuilder.DropIndex(
                name: "IX_Dreamers_UserId",
                table: "Dreamers");

            migrationBuilder.DropColumn(
                name: "Login",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Dreamers");

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DreamUrl",
                table: "Dreamers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Dreamers",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Dreamers",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "DreamSteps",
                columns: table => new
                {
                    DreamStepId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StepDescription = table.Column<string>(nullable: false),
                    DreamId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DreamSteps", x => x.DreamStepId);
                    table.ForeignKey(
                        name: "FK_DreamSteps_Dreams_DreamId",
                        column: x => x.DreamId,
                        principalTable: "Dreams",
                        principalColumn: "DreamId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "Dreamers",
                keyColumn: "DreamerId",
                keyValue: 1L,
                columns: new[] { "DreamUrl", "FirstName", "LastName" },
                values: new object[] { "http://google.com", "Łukasz", "Wójcik" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1L,
                column: "Email",
                value: "admin@admin.pl");

            migrationBuilder.CreateIndex(
                name: "IX_DreamSteps_DreamId",
                table: "DreamSteps",
                column: "DreamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DreamSteps");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DreamUrl",
                table: "Dreamers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Dreamers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Dreamers");

            migrationBuilder.AddColumn<string>(
                name: "Login",
                table: "Users",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Dreamers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.UpdateData(
                table: "Dreamers",
                keyColumn: "DreamerId",
                keyValue: 1L,
                column: "UserId",
                value: 1L);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1L,
                column: "Login",
                value: "admin");

            migrationBuilder.CreateIndex(
                name: "IX_Dreamers_UserId",
                table: "Dreamers",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Dreamers_Users_UserId",
                table: "Dreamers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
