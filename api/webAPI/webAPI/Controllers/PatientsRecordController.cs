using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using webAPI.Models;

namespace webAPI.Controllers
{
    public class PatientsRecordController : ApiController
    {

        public HttpResponseMessage Get() {
            string query = @"
                select pr.id, pr.patient_id, p.name, p.surname, pr.cause, pr.urgency_level, pr.oSaturation, pr.heartRate, pr.temperature, pr.sistolePreasure, pr.diastolePreasure, pr.arrivalTime  
                from patients_record pr 
                INNER JOIN pacientes p ON p.id = pr.patient_id ORDER BY arrivalTime
            ";
            DataTable table = new DataTable();

            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["TriajeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd)) {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public HttpResponseMessage Post(Patient pat)
        { // Lo utilizaremos para recuperar el historial de asistencia de un paciente por su id
            string query = @"
                select pr.id, pr.patient_id, p.name, p.surname, pr.cause, pr.urgency_level, pr.oSaturation, pr.heartRate, pr.temperature, pr.sistolePreasure, pr.diastolePreasure, pr.arrivalTime  
                from patients_record pr 
                INNER JOIN pacientes p ON p.id = pr.patient_id 
                WHERE p.id =" + pat.id + @" 
                ORDER BY arrivalTime
                ";

            DataTable table = new DataTable();

            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["TriajeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Put(PatientsRecordData pat)
        {
            string query = @"
                insert into dbo.patients_record VALUES (" + pat.patient_id + @",'" + pat.cause + @"'," + pat.urgency_level + @"," + pat.oSaturation + @"," + pat.heartRate + @"," + pat.temperature + @"," + pat.sistolePreasure + @"," + pat.diastolePreasure + @",'" + pat.arrivalTime + @"')";
            try
            {

                DataTable table = new DataTable();

                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["TriajeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Succesfully!!";

            }
            catch (Exception)
            {
                return "Failed to Update!!"+ query;
            }
        }
    }
}
