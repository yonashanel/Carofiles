using System;
using System.Data.Common;
using System.Text.Json.Serialization;

namespace CourseAdminSystem.Model.Entities;

public class Instructor {
    public Instructor (int instructor_id)
    {
        Instructor_id = instructor_id;
    }

    public int Instructor_id { get; set; }
   public string Name { get; set; }
   public string Email { get; set; }
   public string Password_hash { get; set; }
}
