﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace XpresionCloud.Controllers
{
    public class BranchController : Controller
    {
        //
        // GET: /Branch/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Branch/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Branch/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Branch/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Branch/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Branch/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Branch/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Branch/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
