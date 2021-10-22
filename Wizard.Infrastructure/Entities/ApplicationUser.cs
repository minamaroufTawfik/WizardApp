using Microsoft.AspNetCore.Identity;

namespace Wizard.Infrastructure.Entities
{
    public class ApplicationUser: IdentityUser<long>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
