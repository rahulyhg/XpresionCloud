using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XpresionCloud.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Report/

        public ActionResult ScanReport()
        {
            return View();
        }

        public ActionResult OpsReport()
        {
            return View();
        }

        public ActionResult statReport()
        {
            return View();
        }
    }
}
