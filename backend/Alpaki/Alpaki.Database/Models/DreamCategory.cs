using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Alpaki.Database.Models
{
    public class DreamCategory
    {
        [Key]
        public long DreamCategoryId { get; set; }

        [MaxLength(250)]
        [Required]
        public string CategoryName { get; set; }

        public virtual ICollection<Dream> Dreams { get; set; }
    }
}
