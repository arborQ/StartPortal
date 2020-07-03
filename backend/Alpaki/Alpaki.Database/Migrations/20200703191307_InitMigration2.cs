using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Alpaki.Database.Migrations
{
    public partial class InitMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DreamId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DreamComeTrueDate",
                table: "Dreams",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<int>(
                name: "DreamState",
                table: "Dreams",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_DreamId",
                table: "Users",
                column: "DreamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Dreams_DreamId",
                table: "Users",
                column: "DreamId",
                principalTable: "Dreams",
                principalColumn: "DreamId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Dreams_DreamId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_DreamId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DreamId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DreamComeTrueDate",
                table: "Dreams");

            migrationBuilder.DropColumn(
                name: "DreamState",
                table: "Dreams");
        }
    }
}
