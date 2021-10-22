using System.Threading.Tasks;
using Wizard.Application.Models;

namespace Wizard.Application.Interfaces
{
    public interface ISectionItemManager
    {
        Task<int> Add(SectionItemModel model, long userId);
        Task<bool> Update(SectionItemModel model);
        Task<bool> Delete(int itemId);
    }
}
