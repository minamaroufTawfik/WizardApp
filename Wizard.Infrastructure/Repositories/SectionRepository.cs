using System.Collections.Generic;
using System.Threading.Tasks;
using Wizard.Core.Entities;
using Wizard.Core.Repositories;
using Wizard.Core.Specifications;
using Wizard.Infrastructure.Data;
using Wizard.Infrastructure.Repositories.Base;

namespace Wizard.Infrastructure.Repositories
{
    public class SectionRepository : Repository<Section>, ISectionRepository
    {
        public SectionRepository(WizardContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<Section>> GetAllWithItems(long userId)
        {
            var spec = new SectionWithItemsSpecification(userId);
            return await GetAsync(spec);
        }
    }
}
