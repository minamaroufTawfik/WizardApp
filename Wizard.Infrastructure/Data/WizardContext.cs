using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Wizard.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Wizard.Infrastructure.Entities;

namespace Wizard.Infrastructure.Data
{
    public class WizardContext : IdentityDbContext<ApplicationUser, ApplicationRole, long>
    {
        public DbSet<Section> Sections { get; set; }
        public DbSet<SectionItem> SectionItems { get; set; }


        public WizardContext(DbContextOptions<WizardContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetTableNamesAsSingle(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private static void SetTableNamesAsSingle(ModelBuilder builder)
        {
            // Use the entity name instead of the Context.DbSet<T> name
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                builder.Entity(entityType.ClrType).ToTable(entityType.ClrType.Name);
            }
        }
    }
}
