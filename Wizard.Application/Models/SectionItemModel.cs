using Wizard.Application.Models.Base;

namespace Wizard.Application.Models
{
    public class SectionItemModel : BaseModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int SectionId { get; set; }
    }
}
