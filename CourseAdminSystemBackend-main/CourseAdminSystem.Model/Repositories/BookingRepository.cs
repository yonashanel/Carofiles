using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

namespace CourseAdminSystem.Model.Repositories;

public class BookingRepository : BaseRepository
{
   public BookingRepository(IConfiguration configuration) : base(configuration)
   {
   }

   public Booking GetBookingById(int booking_id)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from booking where booking_id = @booking_id";

         cmd.Parameters.Add("@booking_id", NpgsqlDbType.Integer).Value = booking_id;

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            if (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               return new Booking(Convert.ToInt32(data["booking_id"]))
               {               
                  Member_id = (int)data["member_id"],
                  Workout_id = (int)data["workout_id"],
                  Booking_date = Convert.ToDateTime(data["booking_date"]),
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
   public List<Booking> GetBookings()
   {
      NpgsqlConnection dbConn = null;
      var bookings = new List<Booking>();
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from booking";

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            while (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               Booking s = new Booking(Convert.ToInt32(data["booking_id"]))
               {
                  Member_id = (int)data["member_id"],
                  Workout_id = (int)data["workout_id"],
                  Booking_date = Convert.ToDateTime(data["booking_date"]),
               };

               bookings.Add(s);
            }
         }

         return bookings;
      }
      finally
      {
         dbConn?.Close();
      }
   }

   //add a new Booking
   public bool InsertBooking(Booking s)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         dbConn = new NpgsqlConnection(ConnectionString);
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = @"
insert into booking
(member_id, workout_id, booking_date)
values
(@member_id, @workout_id, @booking_date)
";

         //adding parameters in a better way       
         cmd.Parameters.AddWithValue("@member_id", NpgsqlDbType.Integer, s.Member_id);
         cmd.Parameters.AddWithValue("@Workout_id", NpgsqlDbType.Integer, s.Workout_id);
         cmd.Parameters.AddWithValue("@booking_date", NpgsqlDbType.Date, s.Booking_date);

         //will return true if all goes well
         bool result = InsertData(dbConn, cmd);

         return result;
      }
      finally
      {
         dbConn?.Close();
      }
   }

   public bool UpdateBooking(Booking s)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
update booking set
    member_id=@member_id,
    workout_id=@workout_id,
    booking_date=@booking_date

where
booking_id = @booking_id";

      cmd.Parameters.AddWithValue("@member_id", NpgsqlDbType.Integer, s.Member_id);
      cmd.Parameters.AddWithValue("@workout_id", NpgsqlDbType.Integer, s.Workout_id);
      cmd.Parameters.AddWithValue("@booking_date", NpgsqlDbType.Date, s.Booking_date);
      cmd.Parameters.AddWithValue("@booking_id", NpgsqlDbType.Integer, s.Booking_id);

      bool result = UpdateData(dbConn, cmd);
      return result;
   }

   public bool DeleteBooking(int booking_id)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
delete from booking
where booking_id = @booking_id
";

      //adding parameters in a better way
      cmd.Parameters.AddWithValue("@booking_id", NpgsqlDbType.Integer, booking_id);

      //will return true if all goes well
      bool result = DeleteData(dbConn, cmd);

      return result;
   }
}
