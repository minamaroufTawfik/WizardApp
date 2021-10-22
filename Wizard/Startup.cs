using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Wizard.Application.Business;
using Wizard.Application.Interfaces;
using Wizard.Application.Mapper;
using Wizard.Core.Repositories;
using Wizard.Core.Repositories.Base;
using Wizard.Identity;
using Wizard.Infrastructure.Data;
using Wizard.Infrastructure.Entities;
using Wizard.Infrastructure.Repositories;
using Wizard.Infrastructure.Repositories.Base;

namespace Wizard
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            services.AddSingleton(mapper);

            ConfigureWizardServices(services);

            services.AddCors(options =>
            {
                //https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-2.2
                options.AddDefaultPolicy(
                    builder => builder.WithOrigins("*")
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        //Set the allowed HTTP methods
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Wizard", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Wizard v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureWizardServices(IServiceCollection services)
        {
            ConfigureInfrastructureLayer(services);
            ConfigureApplicationLayer(services);
            services.AddScoped<IAuthService, AuthService>();
        }

        private void ConfigureInfrastructureLayer(IServiceCollection services)
        {
            ConfigureDatabases(services);
            ConfigureIdentity(services);
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<ISectionRepository, SectionRepository>();
            services.AddScoped<ISectionItemRepository, SectionItemRepository>();
        }

        private void ConfigureIdentity(IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, ApplicationRole>().AddEntityFrameworkStores<WizardContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // Default Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 5;
                options.Password.RequiredUniqueChars = 1;
                options.Lockout.MaxFailedAccessAttempts = 1000;

                // Default SignIn settings.
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
            });

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    RequireExpirationTime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(StaticDetails.SecretKey)),
                    ValidateIssuerSigningKey = true
                };

            });
        }

        private void ConfigureApplicationLayer(IServiceCollection services)
        {
            services.AddScoped<ISectionManager, SectionManager>();
            services.AddScoped<ISectionItemManager, SectionItemManager>();
        }

        private void ConfigureDatabases(IServiceCollection services)
        {
            services.AddDbContext<WizardContext>(c =>
                c.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
