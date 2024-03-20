using CodePulse.API.Models.Dtos;
using CodePulse.API.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CodePulse.API.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager,
            ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("api/auth/register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequest)
        {
            var newUser = new IdentityUser
            {
                UserName = registerRequest.Username,
                Email = registerRequest.Email,
            };

            var identityResult = await userManager.CreateAsync(newUser, registerRequest.Password);

            if(identityResult.Succeeded)
            {
                identityResult = await userManager.AddToRoleAsync(newUser, "Reader");
                if (identityResult.Succeeded) return Ok(newUser);
            }

            if (identityResult.Errors.Any())
            {
                foreach (var error in identityResult.Errors)
                {
                    ModelState.AddModelError("", error+"");
                }
            }

            return ValidationProblem(ModelState);
        }


        [HttpPost]
        [Route("api/auth/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            var identityUser = await userManager.FindByNameAsync(loginRequest.Username);
            if(identityUser is not null)
            {
                var checkPassResult = await userManager.CheckPasswordAsync(identityUser, loginRequest.Password);
                if (checkPassResult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);

                    if(roles is not null)
                    {
                        var token = tokenRepository.GenerateToken(identityUser, roles.ToList());
                        var loginResponse = new LoginResponseDto
                        {
                            Username = identityUser?.UserName,
                            Email = identityUser?.Email,
                            Roles = roles.ToList(),
                            Token = token
                        };
                        return Ok(loginResponse);
                    }
                }
            }

            ModelState.AddModelError("", "Username or password is incorrect");
            return ValidationProblem(ModelState);
        }
    }

    
}
