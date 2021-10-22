using Wizard.Core.Entities;
using Wizard.Core.Specifications.Base;

namespace Wizard.Core.Specifications
{
    public class SectionWithItemsSpecification : BaseSpecification<Section>
    {
        public SectionWithItemsSpecification(long userId) : base(section => section.CreatedBy == userId)
        {
            AddInclude(section => section.Items);
        }
    }
}
