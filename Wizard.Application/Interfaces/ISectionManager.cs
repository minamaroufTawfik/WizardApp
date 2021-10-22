using System.Collections.Generic;
using System.Threading.Tasks;
using Wizard.Application.Models;

namespace Wizard.Application.Interfaces
{
    public interface ISectionManager
    {
        Task<List<SectionWithItemsModel>> GetAll(long userId);
        Task<int> Add(SectionModel sectionModel, long userId);
        Task<bool> Delete(int sectionId);
    }
}
