using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Test_task.Controllers
{
    [Route("api/[controller]")]
    public class TestTaskController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<DataTable> GetInformation()
        {
            SqlConnection conectionToSQL = new SqlConnection("Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=True;");
            string queryToDB = "SELECT * FROM TestTask";
            SqlCommand comand = new SqlCommand(queryToDB, conectionToSQL);

            DataTable customerTable = new DataTable("TestTaskTable");

            SqlDataAdapter dataAdapter = new SqlDataAdapter(comand);

            conectionToSQL.Open();
            dataAdapter.Fill(customerTable);
            conectionToSQL.Close();
            return Enumerable.Range(1, 1).Select(id => customerTable);
        }

        [HttpGet("[action]")]
        public string SetInformation(string firstName, string secondName)
        {
            SqlConnection conectionToSQL = new SqlConnection("Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=True;");
            conectionToSQL.Open();

            string queryToDB = "INSERT INTO TestTask(FirstName, SecondName) VALUES ('" + firstName + "', '" + secondName + "');";
            SqlCommand comand = new SqlCommand(queryToDB, conectionToSQL);

            comand.ExecuteNonQuery();

            conectionToSQL.Close();
            return "Curent value " + firstName + " " + secondName;
        }
    }
}
