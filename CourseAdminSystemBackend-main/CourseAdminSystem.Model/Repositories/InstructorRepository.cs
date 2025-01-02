using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

namespace CourseAdminSystem.Model.Repositories;

public class InstructorRepository : BaseRepository
{
   public InstructorRepository(IConfiguration configuration) : base(configuration)
   {
   }

   public Instructor GetInstructorById(int instructor_id)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from instructor where instructor_id = @instructor_id";

         cmd.Parameters.Add("@instructor_id", NpgsqlDbType.Integer).Value = instructor_id;

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            if (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               return new Instructor(Convert.ToInt32(data["instructor_id"]))
               {
                  Name = data["name"].ToString(),                  
                  Email = data["email"].ToString(),
                  Password_hash = data["password_hash"].ToString(),
               };
            }
         }

         return null;
      }
      finally
      {
         dbConn?.Close();
      }
   }
   public List<Instructor> GetInstructors()
   {
      NpgsqlConnection dbConn = null;
      var instructors = new List<Instructor>();
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from instructor";

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            while (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               Instructor s = new Instructor(Convert.ToInt32(data["instructor_id"]))
               {
                  Name = data["name"].ToString(),                  
                  Email = data["email"].ToString(),
                  Password_hash = data["password_hash"].ToString(),
               };

               instructors.Add(s);
            }
         }

         return instructors;
      }
      finally
      {
         dbConn?.Close();
      }
   }

   //add a new Instructor
   public bool InsertInstructor(Instructor s)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         dbConn = new NpgsqlConnection(ConnectionString);
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = @"
insert into instructor
(name, email, password_hash)
values
(@name, @email, @password_hash)
";

         //adding parameters in a better way
         cmd.Parameters.AddWithValue("@name", NpgsqlDbType.Text, s.Name);         
         cmd.Parameters.AddWithValue("@email", NpgsqlDbType.Text, s.Email);
         cmd.Parameters.AddWithValue("@password_hash", NpgsqlDbType.Text, s.Password_hash);

         //will return true if all goes well
         bool result = InsertData(dbConn, cmd);

         return result;
      }
      finally
      {
         dbConn?.Close();
      }
   }

   public bool UpdateInstructor(Instructor s)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
update instructor set
    name=@name,
    email=@email,
    password_hash=@password_hash
where
   instructor_id = @instructor_id";

      cmd.Parameters.AddWithValue("@name", NpgsqlDbType.Text, s.Name);
      cmd.Parameters.AddWithValue("@email", NpgsqlDbType.Text, s.Email);
      cmd.Parameters.AddWithValue("@password_hash", NpgsqlDbType.Text, s.Password_hash);
      cmd.Parameters.AddWithValue("@instructor_id", NpgsqlDbType.Integer, s.Instructor_id);

      bool result = UpdateData(dbConn, cmd);
      return result;
   }

   public bool DeleteInstructor(int instructor_id)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
delete from instructor
where instructor_id = @instructor_id
";

      //adding parameters in a better way
      cmd.Parameters.AddWithValue("@instructor_id", NpgsqlDbType.Integer, instructor_id);

      //will return true if all goes well
      bool result = DeleteData(dbConn, cmd);

      return result;
   }
}
