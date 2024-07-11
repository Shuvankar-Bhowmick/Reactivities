using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        /* Using data annotations for validations */

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,8}$",
            ErrorMessage = "Password must be complex"
        )]
        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
