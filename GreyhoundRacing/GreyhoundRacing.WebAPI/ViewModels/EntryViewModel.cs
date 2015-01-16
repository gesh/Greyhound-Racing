using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GreyhoundRacing.WebAPI.ViewModels
{
    public class EntryViewModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public decimal Odds { get; set; }
    }
}