using System;
using System.Data.Common;
using System.Text.Json.Serialization;

namespace CourseAdminSystem.Model.Entities;

public class Student {
    public Student(int id)
    {
        Id = id;
    }

    public int Id { get; set; }
   public string FirstName { get; set; }
   public string LastName { get; set; }
   public int StudyProgramId { get; set; }
   //[JsonPropertyName("dob")]
   public DateTime DateOfBirth { get; set; }
   public string Email { get; set; }
   public string Phone { get; set; }
}
