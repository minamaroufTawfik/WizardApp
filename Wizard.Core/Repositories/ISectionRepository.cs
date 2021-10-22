using System.Collections.Generic;
using System.Threading.Tasks;
using Wizard.Core.Entities;
using Wizard.Core.Repositories.Base;

namespace Wizard.Core.Repositories
{
    public interface ISectionRepository:IRepository<Section>
    {
        Task<IEnumerable<Section>> GetAllWithItems(long userId);
    }
}
