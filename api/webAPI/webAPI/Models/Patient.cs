using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webAPI.Models
{
    public class Patient
    {
        public int id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string genre { get; set; }
        public DateTime bornDate { get; set; }

        public string SSNumber { get; set; }
        public string bloodType { get; set; }
        public string adress { get; set; }
        public int postalCode { get; set; }
        public int phoneNumber { get; set; }
    }
}