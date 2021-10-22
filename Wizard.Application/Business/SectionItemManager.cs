using System.Threading.Tasks;
using AutoMapper;
using Wizard.Application.Interfaces;
using Wizard.Application.Models;
using Wizard.Core.Entities;
using Wizard.Core.Repositories;

namespace Wizard.Application.Business
{
    public class SectionItemManager : ISectionItemManager
    {
        private ISectionItemRepository SectionItemRepository { get; }
        private IMapper Mapper { get; }
        public SectionItemManager(ISectionItemRepository sectionItemRepository, IMapper mapper)
        {
            SectionItemRepository = sectionItemRepository;
            Mapper = mapper;
        }
        public async Task<int> Add(SectionItemModel model, long userId)
        {
            SectionItem item = Mapper.Map<SectionItem>(model);
            item.CreatedBy = userId;
            item = await SectionItemRepository.AddAsync(item);
            return item.Id;
        }

        public async Task<bool> Update(SectionItemModel model)
        {
            SectionItem item = await SectionItemRepository.GetByIdAsync(model.Id);
            if (item != null)
            {
                Mapper.Map(model, item);
                await SectionItemRepository.UpdateAsync(item);
                return true;
            }

            return false;
        }

        public async Task<bool> Delete(int itemId)
        {
            SectionItem item = await SectionItemRepository.GetByIdAsync(itemId);
            if (item != null)
            {
                await SectionItemRepository.DeleteAsync(item);
                return true;
            }

            return false;
        }
    }
}
