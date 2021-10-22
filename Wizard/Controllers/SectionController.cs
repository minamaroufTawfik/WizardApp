
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Wizard.Models;
using Microsoft.AspNetCore.Mvc;
using Wizard.Application.Interfaces;
using Wizard.Application.Models;

namespace Wizard.Controllers
{
    public class SectionController : BootstrapControllerBase
    {
        private ISectionManager SectionManager { get; }

        public SectionController(ISectionManager sectionManager)
        {
            SectionManager = sectionManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<JsonActionResult> GetAll()
        {
            try
            {
                var allSections = await SectionManager.GetAll(GetCurrentUserId());
                return JsonUtility.Success(allSections);
            }
            catch (Exception ex)
            {
                return JsonUtility.Error(ex);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<JsonActionResult> Add(SectionModel sectionModel)
        {
            try
            {
                if (!ModelState.IsValid || sectionModel.Id > 0)
                {
                    return JsonUtility.Error("Invalid Data");
                }

                var sectionId = await SectionManager.Add(sectionModel, GetCurrentUserId());
                return sectionId > 0
                    ? JsonUtility.Success(sectionId)
                    : JsonUtility.Error("Failed To Add");
            }
            catch (Exception ex)
            {
                return JsonUtility.Error(ex);
            }
        }

        [HttpDelete]
        [Route("{sectionId}")]
        [Authorize]
        public async Task<JsonActionResult> Delete(int sectionId)
        {
            try
            {
                if (sectionId <= 0)
                {
                    return JsonUtility.Error("Invalid Data");
                }

                bool isDeleted = await SectionManager.Delete(sectionId);
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
