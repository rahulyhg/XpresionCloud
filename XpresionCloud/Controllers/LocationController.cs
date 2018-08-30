using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XpresionCloud.Controllers
{
    public class LocationController : Controller
    {
        Helper helper = new Helper();

        private Dictionary<string, List<string>> _sessionDict = new Dictionary<string, List<string>>();
        public ActionResult LocationIndex()
        {
            return View();
        }

    }
}
