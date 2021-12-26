using MapApp.Models;
using MapApp.Services;
using MapApp.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MapApp.Controllers
{
    public class HomeController : Controller
    {
        CordinateService cordinateService = new CordinateService();

        public ActionResult Index()
        {
            
          
            return View();
        }

        public JsonResult GetCordinates()
        {
            List<Cordinates> cordinates = new List<Cordinates>();
            try
            {
                cordinates = cordinateService.GetCordinateList();
            }
            catch (Exception ex)
            {

            }
            return Json(cordinates, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult PointCreate(Cordinates coordinate)
        {
            bool success = false;
            try
            {
                success = cordinateService.SaveCordinate(coordinate);
                if (!success)
                    throw new Exception("Kordinat Kaydetme İşlemi Başarısız");

            }
            catch (Exception ex)
            {
                
               
            }
            return Json(success, JsonRequestBehavior.AllowGet);
        }
     
    }
}