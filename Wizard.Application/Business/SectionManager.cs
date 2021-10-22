using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Wizard.Application.Interfaces;
using Wizard.Application.Models;
using Wizard.Core.Entities;
using Wizard.Core.Repositories;

namespace Wizard.Application.Business
{
    public class SectionManager : ISectionManager
    {
        private ISectionRepository SectionRepository { get; }
        private IMapper Mapper { get; }
        public SectionManager(ISectionRepository sectionRepository, IMapper mapper)
        {
            SectionRepository = sectionRepository;
            Mapper = mapper;
        }
        public async Task<List<SectionWithItemsModel>> GetAll(long userId)
        {
            IEnumerable<Section> sections = await SectionRepository.GetAllWithItems(userId);
            List<SectionWithItemsModel> sectionModels = Mapper.Map<List<SectionWithItemsModel>>(sections);
            return sectionModels;
        }

        public async Task<int> Add(SectionModel sectionModel, long userId)
        {
            Section section = Mapper.Map<Section>(sectionModel);
            section.CreatedBy = userId;
            section = await SectionRepository.AddAsync(section);
            return section.Id;
        }

        public async Task<bool> Delete(int sectionId)
        {
            Section section = await SectionRepository.GetByIdAsync(sectionId);
            if (section != null)
            {
                await SectionRepository.DeleteAsync(section);
                return true;
            }

            return false;
        }
    }
}
