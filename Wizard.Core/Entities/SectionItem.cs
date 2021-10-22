using System.ComponentModel.DataAnnotations.Schema;
using Wizard.Core.Entities.Base;

namespace Wizard.Core.Entities
{
    public class SectionItem : Entity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int SectionId { get; set; }
        
        [ForeignKey(nameof(SectionId))]
        public virtual Section Section { get; set; }
    }
}
