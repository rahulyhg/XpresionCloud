using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace XpresionCloud
{
    public class Helper
    {
        public string getConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["strConnct"].ToString();
        }

        /// <summary>
        /// Created By Rv : 26/07/2017 
        /// param is JSON String
        /// </summary>
        /// <param name="proc"></param>
        /// <param name="param"></param>
        /// <returns>DataSet</returns>
        public DataSet getDataSet(string proc, string param)
        {
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(getConnectionString());
            SqlCommand com = new SqlCommand();
            SqlDataAdapter da = new SqlDataAdapter();
            try
            {
                var jobj = JObject.Parse(param);
                var jarray = jobj["data"].Value<JObject>();
                con.Open();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = proc;
                foreach (var value in jarray)
                {
                    com.Parameters.AddWithValue(value.Key, jarray[value.Key].Value<String>());
                }

                da.SelectCommand = com;
                da.Fill(ds);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                com.Dispose();
                con.Close();
                GC.Collect();
            }
            return ds;
        }

        /// <summary>
        /// Created By Rv : 26/07/2017 
        /// param is List<KeyValuePair<string,object>>
        /// </summary>
        /// <param name="proc"></param>
        /// <param name="param"></param>
        /// <returns>DataSet</returns>
        public DataSet getDataSet(string proc, List<KeyValuePair<string, object>> param)
        {
            DataSet ds = new DataSet();
            SqlConnection con = new SqlConnection(getConnectionString());
            SqlCommand com = new SqlCommand();
            SqlDataAdapter da = new SqlDataAdapter();
            try
            {
                con.Open();
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = proc;
                com.Connection = con;
                foreach (var element in param)
                {
                    com.Parameters.AddWithValue(element.Key, element.Value);
                }
                da.SelectCommand = com;
                da.Fill(ds);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                com.Dispose();
                con.Close();
                GC.Collect();
            }
            return ds;
        }

        /// <summary>
        /// Created By Rv : 26/07/2017 
        /// Param is JSON String
        /// </summary>
        /// <param name="proc"></param>
        /// <param name="param"></param>
        public void voidData(string proc, string param)
        {
            SqlConnection con = new SqlConnection(getConnectionString());
            SqlCommand com = new SqlCommand();
            try
            {
                var jobj = JObject.Parse(param);
                var jarray = jobj["data"].Value<JObject>();
                con.Open();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = proc;
                foreach (var value in jarray)
                {
                    com.Parameters.AddWithValue(value.Key, jarray[value.Key].Value<String>());
                }

                com.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                com.Dispose();
                con.Close();
                GC.Collect();
            }
        }

        /// <summary>
        /// Created By Rv : 26/07/2017
        /// param is List<KeyValuePair<string, object>>
        /// </summary>
        /// <param name="proc"></param>
        /// <param name="param"></param>
        public void voidData(string proc, List<KeyValuePair<string, object>> param)
        {
            SqlConnection con = new SqlConnection(getConnectionString());
            SqlCommand com = new SqlCommand();
            try
            {
                con.Open();
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = proc;
                com.Connection = con;
                foreach (var element in param)
                {
                    com.Parameters.AddWithValue(element.Key, element.Value);
                }
                com.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                com.Dispose();
                con.Close();
                GC.Collect();
            }
        }

        /// <summary>
        /// Created By Rv : 14/10/2017
        /// 'key' is the key for array key name
        /// </summary>
        /// <param name="proc"></param>
        /// <param name="param"></param>
        /// <param name="key"></param>
        public void voidData(string proc, string param, string key)
        {
            SqlConnection con = new SqlConnection(getConnectionString());
            SqlCommand com = new SqlCommand();
            try
            {
                var jobj = JObject.Parse(param);
                var jarray = jobj[key].Value<JObject>();
                con.Open();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = proc;
                foreach (var value in jarray)
                {
                    com.Parameters.AddWithValue(value.Key, jarray[value.Key].Value<String>());
                }

                com.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                com.Dispose();
                con.Close();
                GC.Collect();
            }
        }
    }
}