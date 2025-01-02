using System;
using System.Data.Common;
using System.Text.Json.Serialization;

namespace CourseAdminSystem.Model.Entities;

public class Booking {
    public Booking (int booking_id)
    {
        Booking_id = booking_id;
    }

    public int Booking_id { get; set; }

   public int Member_id { get; set;}

   public int Workout_id { get; set;}

   public DateTime Booking_date { get; set; }

   public Member Member { get; set; }
   public Workout Workout { get; set; }

}
