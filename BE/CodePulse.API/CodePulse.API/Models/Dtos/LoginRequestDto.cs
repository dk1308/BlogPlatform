﻿using System.ComponentModel.DataAnnotations;

namespace CodePulse.API.Models.Dtos
{
    public class LoginRequestDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
