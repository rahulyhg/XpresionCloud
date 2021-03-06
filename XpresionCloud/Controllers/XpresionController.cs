﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XpresionCloud.Controllers
{
    public class XpresionController : Controller
    {
        //
        // GET: /Xpresion/
        Helper helper = new Helper();
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UI()
        {
            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult Error500()
        {
            return View();
        }

        public ActionResult Error404()
        {
            return View();
        }

        public ActionResult Error403()
        {
            return View();
        }

        [HttpPost]
        public ActionResult getData(string param, string proc)
        {
            List<Dictionary<string, object>> parent = new List<Dictionary<string, object>>();
            Dictionary<string, object> child;
            DataSet ds = new DataSet();
            try
            {
                ds = helper.getDataSet(proc, param);
                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        child = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            child.Add(col.ColumnName, dr[col]);
                        }
                        parent.Add(child);
                    }
                    Session["comp_code"] = "LPEX";
                    Session["user"] = ds.Tables[0].Rows[0]["User_Name"].ToString();
                    Session["crm_id"] = "1995";
                }
                
            }
            catch (Exception e)
            {
                child = new Dictionary<string, object>();
                child.Add("Status", 1);
                child.Add("Message", e.Message);
                parent.Add(child);
                Session["comp_code"] = "LPEX";
                //Session["user"] = ds.Tables[0].Rows[0]["User_Name"].ToString();
                Session["user"] = "Rv";
                Session["crm_id"] = "1995";
            }
            return Json(parent);
        }
    }
}
