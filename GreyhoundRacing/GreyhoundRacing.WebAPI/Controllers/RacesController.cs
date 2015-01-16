using GreyhoundRacing.WebAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Xml;

namespace GreyhoundRacing.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RacesController : ApiController
    {
        [HttpGet]
        public ICollection<RaceViewModel> GetRaces()
        {

            //TODO: check for valid data
            var pathToXML = @"../../Users/gesh/Documents/GitHub/Greyhound-Racing/GreyhoundRacing/files/race.xml";

            XmlDocument dataSource = new XmlDocument();
            dataSource.Load(pathToXML);

            var upcomingEvents = dataSource.DocumentElement;

            var races = new List<RaceViewModel>();

            foreach (XmlNode raceEvent in upcomingEvents.ChildNodes)
            {
                var race = new RaceViewModel();

                race.ID = int.Parse(raceEvent.Attributes["ID"].Value);
                race.Name = raceEvent.Attributes["Name"].Value;
                race.EventNumber = int.Parse(raceEvent.Attributes["EventNumber"].Value);
                race.EventTime = DateTime.Parse(raceEvent.Attributes["EventTime"].Value);
                race.FinishTime = DateTime.Parse(raceEvent.Attributes["FinishTime"].Value);
                race.Distance = double.Parse(raceEvent.Attributes["Distance"].Value);

                race.Entries = new List<EntryViewModel>();

                XmlNodeList entriesNodes = raceEvent.ChildNodes;

                foreach (XmlNode entryNode in entriesNodes)
                {
                    var entry = new EntryViewModel();

                    entry.ID = int.Parse(entryNode.Attributes["ID"].Value);
                    entry.Name = entryNode.Attributes["Name"].Value;
                    entry.Odds = decimal.Parse(entryNode.Attributes["OddsDecimal"].Value);

                    race.Entries.Add(entry);
                }

                races.Add(race);
               
            }

            return races;
        }
    }
}
