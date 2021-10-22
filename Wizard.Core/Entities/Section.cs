using System.Collections.Generic;
using Wizard.Core.Entities.Base;

namespace Wizard.Core.Entities
{
    public class Section : Entity
    {
        public string Title { get; set; }
        public int Order { get; set; }
        public ICollection<SectionItem> Items { get; set; }
    }
}
