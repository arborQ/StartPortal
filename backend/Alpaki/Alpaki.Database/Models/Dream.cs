using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Alpaki.Database.Models
{
    public class Dream
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long DreamId { get; set; }

        public string Tags { get; set; }

        [ForeignKey(nameof(Dreamer))]
        public long DreamerId { get; set; }

        public Dreamer Dreamer { get; set; }

        [ForeignKey(nameof(DreamCategory))]
        public long DreamCategoryId { get; set; }

        public DreamCategory DreamCategory { get; set; }
    }
}
