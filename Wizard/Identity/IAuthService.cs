using System.Threading.Tasks;
using Wizard.Models;

namespace Wizard.Identity
{
    public interface IAuthService
    {
        Task<bool> RegisterUserAsync(RegisterModel model);

        Task<string> LoginUserAsync(LoginModel model);
    }
}
