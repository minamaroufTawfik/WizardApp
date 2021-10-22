using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wizard.Identity;
using Wizard.Models;

namespace Wizard.Controllers
{
    public class AuthController : BootstrapControllerBase
    {
        private IAuthService AuthService { get; }

        public AuthController(IAuthService authService)
        {
            AuthService = authService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<JsonActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                bool isSuccess = await AuthService.RegisterUserAsync(model);
                return isSuccess ? JsonUtility.Success() : JsonUtility.Error("Invalid Data");
            }

            return JsonUtility.Error("Invalid Data");
        }


        [HttpPost]
        [Route("login")]
        public async Task<JsonActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                string accessToken = await AuthService.LoginUserAsync(model);
                if (!string.IsNullOrEmpty(accessToken))
                {
                    return JsonUtility.Success(accessToken);
                }
            }

            return JsonUtility.Error("Invalid Data");
        }

    }
}
