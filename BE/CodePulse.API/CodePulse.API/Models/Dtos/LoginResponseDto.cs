﻿namespace CodePulse.API.Models.Dtos
{
    public class LoginResponseDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
    }
}
