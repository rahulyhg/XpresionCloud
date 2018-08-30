using Newtonsoft.Json;
using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using ClosedXML.Excel;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;

namespace XpresionCloud.Controllers
{
    public class ZoneController : Controller
    {
        //
        // GET: /Zone/
        Helper helper = new Helper();
        
        private Dictionary<string, List<string>> _sessionDict = new Dictionary<string, List<string>>();
        public ActionResult ZoneIndex()
        {
            return View();
        }

        
        
    }
}
