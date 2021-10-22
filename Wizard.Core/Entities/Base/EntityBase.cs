using System;
using System.ComponentModel.DataAnnotations;

namespace Wizard.Core.Entities.Base
{
    public abstract class EntityBase<TId> : IEntityBase<TId>
    {
        [Key] public virtual TId Id { get; protected set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; }
    }
}
