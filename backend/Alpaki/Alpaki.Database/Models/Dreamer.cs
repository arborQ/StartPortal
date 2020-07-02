using Alpaki.CrossCutting.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Alpaki.Database.Models
{
    public class Dreamer
    {
        [Key]
        public long DreamerId { get; set; }

        public string DisplayName => $"{User.FirstName} {User.LastName}";

        public byte Age { get; set; }

        public GenderEnum Gender { get; set; }

        [ForeignKey(nameof(User))]
        public long UserId { get; set; }

        public virtual User User { get; set; }
    }
}
