/*
 The reason we don't use mediator is because it is already inside the application layer and once we get into the application layer we've already basically authenticated so we keep the Identiy endpoint completely separated from the mediator.
*/


using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public AccountController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
            {
                var response = new UserDto
                {
                    DisplayName = user.UserName,
                    Image = null,
                    Token = "this will be a token",
                    Username = user.UserName
                };
                return Ok(response);
            }

            return Unauthorized();
        }
    }
}
