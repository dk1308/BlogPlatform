using Microsoft.AspNetCore.Identity;

namespace CodePulse.API.Repositories
{
    public interface ITokenRepository
    {
        string GenerateToken(IdentityUser user, List<string> roles);
    }
}
