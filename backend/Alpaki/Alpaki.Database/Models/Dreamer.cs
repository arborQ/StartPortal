using Alpaki.CrossCutting.Enums;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Alpaki.Database.Models
{
    public class Dreamer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long DreamerId { get; set; }

        public int Age { get; set; }

        public GenderEnum Gender { get; set; }

        [ForeignKey(nameof(User))]
        public long UserId { get; set; }

        public virtual User User { get; set; }

        public virtual ICollection<Dream> Dreams { get; set; }
    }
}
