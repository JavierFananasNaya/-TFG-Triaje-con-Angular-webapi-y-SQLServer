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
    public class PatientController : ApiController
    {

        public HttpResponseMessage Get() {
            string query = @"
                select id, name, surname, genre, bornDate, SSNumber, bloodType, adress, postalCode, phoneNumber
                from dbo.pacientes
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

        public string Post(Patient pat) {
            try
            {
                
                string query = @"
                    insert into dbo.pacientes VALUES ('" + pat.name + @"','" + pat.surname + @"','" + pat.genre + @"','" + pat.bornDate + @"','" + pat.SSNumber + @"','" + pat.bloodType + @"','" + pat.adress + @"'," + pat.postalCode + @"," + pat.phoneNumber + @")";

                DataTable table = new DataTable();

                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["TriajeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Succesfully!!";

            }
            catch (Exception)
            {
                return "Failed to Add!!";
            }
        }

        public string Put(Patient pat)
        {

                string query = @"
                    update dbo.pacientes set name = '" + pat.name + @"',surname = '" + pat.surname + @"', genre ='" + pat.genre + @"', bornDate = '" + pat.bornDate + @"', SSNumber = '" + pat.SSNumber + @"', bloodType = '" + pat.bloodType + @"', adress = '" + pat.adress + @"', postalCode = " + pat.postalCode + @", phoneNumber = " + pat.phoneNumber + @" WHERE id ="+ pat.id+@"
                    ";
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

        public string Delete(int patientId)
        {

            try
            {
                string query = @"
                    delete from dbo.pacientes WHERE id =" + patientId + @"
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

                return "Deleted Succesfully!!";

            }
            catch (Exception)
            {
                return "Failed to Delete!!";
            }
        }
    }
}
