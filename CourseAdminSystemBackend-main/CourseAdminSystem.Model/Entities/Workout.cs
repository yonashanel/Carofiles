using System;
using System.Data.Common;
using System.Text.Json.Serialization;

namespace CourseAdminSystem.Model.Entities;

public class Workout {
    public Workout (int workout_id)
    {
        Workout_id = workout_id;
    }

    public int Workout_id { get; set; }
   public string Workout_name { get; set; }

   public int Instructor_id { get; set;}

   public int Duration { get; set; }

   public string Description { get; set; }

   public int Capacity { get; set; }

   public Instructor Instructor { get; set; }

}
