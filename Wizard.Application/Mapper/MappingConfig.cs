using AutoMapper;
using Wizard.Application.Models;
using Wizard.Core.Entities;

namespace Wizard.Application.Mapper
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mapperConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<SectionModel, Section>().ReverseMap();
                config.CreateMap<SectionItemModel, SectionItem>().ReverseMap();
                config.CreateMap<SectionWithItemsModel, Section>().ReverseMap();
            });
            return mapperConfig;
        }
    }
}
