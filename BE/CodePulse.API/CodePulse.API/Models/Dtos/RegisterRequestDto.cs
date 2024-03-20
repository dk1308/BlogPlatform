using System.ComponentModel.DataAnnotations;

namespace CodePulse.API.Models.Dtos
{
    public class RegisterRequestDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
