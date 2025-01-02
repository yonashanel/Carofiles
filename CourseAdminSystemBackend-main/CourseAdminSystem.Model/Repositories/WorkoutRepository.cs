using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

namespace CourseAdminSystem.Model.Repositories;

public class WorkoutRepository : BaseRepository
{
   public WorkoutRepository(IConfiguration configuration) : base(configuration)
   {
   }

   public Workout GetWorkoutById(int workout_id)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from workout where workout_id = @workout_id";

         cmd.Parameters.Add("@workout_id", NpgsqlDbType.Integer).Value = workout_id;

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            if (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               return new Workout(Convert.ToInt32(data["workout_id"]))
               {               
                  Workout_name = data["workout_name"].ToString(),
                  Instructor_id = (int)data["instructor_id"],
                  Duration = (int)data["duration"],
                  Capacity = (int)data["capacity"],
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
   public List<Workout> GetWorkouts()
   {
      NpgsqlConnection dbConn = null;
      var workouts = new List<Workout>();
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from workout";

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            while (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               Workout s = new Workout(Convert.ToInt32(data["workout_id"]))
               {               
                  Workout_name = data["workout_name"].ToString(),
                  Instructor_id = (int)data["instructor_id"],
                  Duration = (int)data["duration"],
                  Capacity = (int)data["capacity"],
               };

               workouts.Add(s);
            }
         }

         return workouts;
      }
      finally
      {
         dbConn?.Close();
      }
   }

   //add a new Workout
   public bool InsertWorkout(Workout s)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         dbConn = new NpgsqlConnection(ConnectionString);
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = @"
insert into workout
(workout_name, instructor_id, duration, capacity)
values
(@workout_name, @instructor_id, @duration, @capacity)
";

         //adding parameters in a better way       
         cmd.Parameters.AddWithValue("@workout_name", NpgsqlDbType.Text, s.Workout_name);
         cmd.Parameters.AddWithValue("@instructor_id", NpgsqlDbType.Integer, s.Instructor_id);
         cmd.Parameters.AddWithValue("@duration", NpgsqlDbType.Integer, s.Duration);
         cmd.Parameters.AddWithValue("@capacity", NpgsqlDbType.Integer, s.Capacity);

         //will return true if all goes well
         bool result = InsertData(dbConn, cmd);

         return result;
      }
      finally
      {
         dbConn?.Close();
      }
   }

   public bool UpdateWorkout(Workout s)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
update workout set
    workout_name=@workout_name,
    instructor_id=@instructor_id,
    duration=@duration,
    capacity=@capacity
where
   workout_id = @workout_id";

      cmd.Parameters.AddWithValue("@workout_name", NpgsqlDbType.Text, s.Workout_name);
      cmd.Parameters.AddWithValue("@instructor_id", NpgsqlDbType.Integer, s.Instructor_id);
      cmd.Parameters.AddWithValue("@duration", NpgsqlDbType.Integer, s.Duration);
      cmd.Parameters.AddWithValue("@capacity", NpgsqlDbType.Integer, s.Capacity);
      cmd.Parameters.AddWithValue("@workout_id", NpgsqlDbType.Integer, s.Workout_id);

      bool result = UpdateData(dbConn, cmd);
      return result;
   }

   public bool DeleteWorkout(int workout_id)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
delete from workout
where workout_id = @workout_id
";

      //adding parameters in a better way
      cmd.Parameters.AddWithValue("@workout_id", NpgsqlDbType.Integer, workout_id);

      //will return true if all goes well
      bool result = DeleteData(dbConn, cmd);

      return result;
   }
}
