using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Wizard.Infrastructure.Entities;
using Wizard.Models;

namespace Wizard.Identity
{
    public class AuthService : IAuthService
    {
        private UserManager<ApplicationUser> UserManager { get; }

        const int AccessTokenExpiryDays = 1;

        public AuthService(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }

        public async Task<bool> RegisterUserAsync(RegisterModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
                EmailConfirmed = true,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };

            var result = await UserManager.CreateAsync(user, model.Password);
            return result.Succeeded;
        }

        public async Task<string> LoginUserAsync(LoginModel model)
        {
            var user = await UserManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return null;
            }

            var isSuccess = await UserManager.CheckPasswordAsync(user, model.Password);
            if (!isSuccess)
            {
                return null;
            }

            string tokenAsString = await GenerateAccessToken(user);
            return tokenAsString;
        }

        private async Task<string> GenerateAccessToken(ApplicationUser user)
        {
            List<Claim> authClaims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString()),

                new Claim(JwtRegisteredClaimNames.Email,
                    user.Email),

                new Claim(JwtRegisteredClaimNames.Sub,
                    user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(StaticDetails.SecretKey));

            var token = new JwtSecurityToken(
                claims: authClaims,
                expires: DateTime.Now.AddDays(AccessTokenExpiryDays),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
