using MapApp.Models;
using MapApp.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MapApp.Services
{
    public class CordinateService
    {
        public List<Cordinates> GetCordinateList()
        {
            CordinateViewModel model = new CordinateViewModel();
            if (File.Exists(@"C:\DataJson\CordinateData.json"))
            {
                using (StreamReader reader = new StreamReader(@"C:\DataJson\CordinateData.json"))
                {
                    string jsonData = reader.ReadToEnd();
                    if (jsonData!=null && jsonData!="")
                    {
                        model.cordinateList = JsonConvert.DeserializeObject<List<Cordinates>>(jsonData);
                        foreach (var item in model.cordinateList)
                        {
                            if (item.xCordinate.Contains(","))
                            {
                                item.xCordinate = item.xCordinate.Replace(",", ".");
                            }
                            if (item.yCordinate.Contains(","))
                            {
                                item.yCordinate = item.yCordinate.Replace(",", ".");
                            }
                        }
                    }
                    reader.Close();
                }
            }
            return model.cordinateList;
        }
        public bool SaveCordinate(Cordinates cordinatessave)
        {
            List<Cordinates> cordinate = new List<Cordinates>();

            try
            {
                if (File.Exists(@"C:\DataJson\CordinateData.json"))
                {
                    using (StreamReader reader = new StreamReader(@"C:\DataJson\CordinateData.json"))
                    {
                        string jsonData = reader.ReadToEnd();
                        if (!string.IsNullOrEmpty(jsonData))
                        {
                            cordinate = JsonConvert.DeserializeObject<List<Cordinates>>(jsonData);
                        } 
                    }
                }
                Cordinates cordinates = new Cordinates();
                cordinates.Name = cordinatessave.Name;
                cordinates.Number = cordinatessave.Number;
                cordinates.xCordinate = cordinatessave.xCordinate;
                cordinates.yCordinate = cordinatessave.yCordinate;
                cordinate.Add(cordinates);
                if (!Directory.Exists(@"C:\DataJson\"))
                {
                    Directory.CreateDirectory(@"C:\DataJson\");
                }
                string cordinatesJson = JsonConvert.SerializeObject(cordinate);
                File.WriteAllText(@"C:\DataJson\CordinateData.json", cordinatesJson);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
	    }


    }

}