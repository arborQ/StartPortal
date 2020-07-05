﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Alpaki.CrossCutting.Enums;

namespace Alpaki.Database.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long UserId { get; set; }

        [MaxLength(250)]
        [Required]
        public string Email { get; set; }

        [MaxLength(250)]
        [Required]
        public string FirstName { get; set; }

        [MaxLength(250)]
        [Required]
        public string LastName { get; set; }

        public string Brand { get; set; }

        public string PhoneNumber { get; set; }

        public UserRoleEnum Role { get; set; }

        public ICollection<AssignedDreams> AssignedDreams { get; set; }
    }
}
