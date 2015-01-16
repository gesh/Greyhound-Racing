using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GreyhoundRacing.WebAPI.ViewModels
{
    public class RaceViewModel
    {
        public int ID { get; set; }
        public int EventNumber { get; set; }

        public DateTime EventTime { get; set; }

        public DateTime FinishTime { get; set; }

        public double Distance { get; set; }

        public string Name { get; set; }

        public ICollection<EntryViewModel> Entries { get; set; }
    }
}