using System;
using System.Collections.Generic;
using Wizard.Models;

namespace Wizard.Helpers
{
    public class JsonUtility
    {
        public JsonActionResult Success(object resultData = null, string message = "")
        {
            return new JsonActionResult
            {
                IsSuccess = true,
                DisplayMessage = message,
                Result = resultData
            };
        }

        public JsonActionResult Error(string errorMsg = "")
        {
            return new JsonActionResult
            {
                IsSuccess = false,
                ErrorMessages = new List<string> { errorMsg }
            };
        }

        public JsonActionResult Error(Exception ex, string message = "")
        {
            return new JsonActionResult
            {
                IsSuccess = false,
                DisplayMessage = message,
                ErrorMessages = new List<string> {ex.ToString()}
            };
        }
    }
}
