using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace CodePulse.API.Repositories
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration configuration;

        public TokenRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string GenerateToken(IdentityUser user, List<string> roles)
        {
            // Create claims
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };    
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            // Create signing credentials
            var signingKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(this.configuration["Jwt:Key"]));
            var signingCredential = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            // Create jwt security token
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                signingCredentials: signingCredential,
                expires: DateTime.Now.AddMinutes(15)
                );

            // Return token as string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
