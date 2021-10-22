using System.Collections.Generic;

namespace Wizard.Application.Models
{
    public class SectionWithItemsModel : SectionModel
    {
        public List<SectionItemModel> Items { get; set; }
    }
}
