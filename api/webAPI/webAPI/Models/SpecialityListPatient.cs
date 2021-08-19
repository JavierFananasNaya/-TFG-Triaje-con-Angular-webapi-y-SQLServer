using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webAPI.Models
{
    public class SpecialityListPatient
    {
        public int id { get; set; }
        public int patient_id { get; set; }
        public DateTime arrivalTime { get; set; }
        public int urgencyLevel { get; set; }

    }
}