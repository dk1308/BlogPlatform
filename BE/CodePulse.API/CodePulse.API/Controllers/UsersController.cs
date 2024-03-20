using CodePulse.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;

        public UsersController(UserManager<IdentityUser> userManager)
        {
            this.userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            try
            {
                email = email.Replace("%40", "@");
                var existUser = await userManager.FindByEmailAsync(email);
                if (existUser is null)
                {
                    return Ok(null);
                }
                else return Ok(new
                {
                    Email = existUser.Email,
                    Username = existUser.UserName
                });
            } catch( Exception ex)
            {
                return Ok(null);
            }
        }
    }
}
