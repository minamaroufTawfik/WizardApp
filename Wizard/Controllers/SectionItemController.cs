using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wizard.Application.Interfaces;
using Wizard.Application.Models;
using Wizard.Models;

namespace Wizard.Controllers
{
    public class SectionItemController : BootstrapControllerBase
    {
        private ISectionItemManager SectionItemManager { get; }

        public SectionItemController(ISectionItemManager sectionItemManager)
        {
            SectionItemManager = sectionItemManager;
        }

        [HttpPost]
        public async Task<JsonActionResult> Add(SectionItemModel model)
        {
            try
            {
                if (!ModelState.IsValid || model.Id > 0 || model.SectionId == 0)
                {
                    return JsonUtility.Error("Invalid Data");
                }

                var itemId = await SectionItemManager.Add(model, GetCurrentUserId());
                return itemId > 0
                    ? JsonUtility.Success(itemId)
                    : JsonUtility.Error("Failed To Add");
            }
            catch (Exception ex)
            {
                return JsonUtility.Error(ex);
            }
        }

        [HttpPut]
        public async Task<JsonActionResult> Update(SectionItemModel model)
        {
            try
            {
                if (!ModelState.IsValid || model.Id == 0)
                {
                    return JsonUtility.Error("Invalid Data");
                }

                var isUpdated = await SectionItemManager.Update(model);
                return isUpdated
                    ? JsonUtility.Success()
                    : JsonUtility.Error("Failed To Update");
            }
            catch (Exception ex)
            {
                return JsonUtility.Error(ex);
            }
        }

        [HttpDelete]
        [Route("{itemId}")]
        public async Task<JsonActionResult> Delete(int itemId)
        {
            try
            {
                if (itemId <= 0)
                {
                    return JsonUtility.Error("Invalid Data");
                }

                bool isDeleted = await SectionItemManager.Delete(itemId);
                return isDeleted
                    ? JsonUtility.Success()
                    : JsonUtility.Error("Failed To Delete");
            }
            catch (Exception ex)
            {
                return JsonUtility.Error(ex);
            }
        }
    }
}
