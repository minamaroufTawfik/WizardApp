using Wizard.Core.Entities;
using Wizard.Core.Repositories;
using Wizard.Infrastructure.Data;
using Wizard.Infrastructure.Repositories.Base;

namespace Wizard.Infrastructure.Repositories
{
    public class SectionItemRepository : Repository<SectionItem>, ISectionItemRepository
    {
        public SectionItemRepository(WizardContext dbContext) : base(dbContext)
        {

        }
    }
}
