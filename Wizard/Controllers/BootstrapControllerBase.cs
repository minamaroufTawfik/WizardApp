using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Wizard.Helpers;

namespace Wizard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BootstrapControllerBase : ControllerBase
    {
        private JsonUtility _jsonUtility;
        protected JsonUtility JsonUtility => _jsonUtility ??= new JsonUtility();

        protected long GetCurrentUserId()
        {
            
            string userIdString = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            long.TryParse(userIdString, out long userId);
            return userId;
        }
    }
}
