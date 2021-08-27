using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webAPI.Models
{
    public class PatientsRecordData
    {
        public int id { get; set; }
        public int patient_id { get; set; }
        public string cause { get; set; }
        public int urgency_level { get; set; }
        public int oSaturation { get; set; }
        public int heartRate { get; set; }
        public int temperature { get; set; }
        public int sistolePreasure { get; set; }
        public int diastolePreasure { get; set; }
        public DateTime arrivalTime { get; set; }
    }
}