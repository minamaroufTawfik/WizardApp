using Wizard.Application.Models.Base;

namespace Wizard.Application.Models
{
    public class SectionModel : BaseModel
    {
        public string Title { get; set; }
        public int Order { get; set; }
    }
}
