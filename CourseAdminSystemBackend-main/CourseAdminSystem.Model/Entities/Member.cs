using System;
using System.Data.Common;
using System.Text.Json.Serialization;

namespace CourseAdminSystem.Model.Entities;

public class Member {
    public Member(int member_id)
    {
        Member_id = member_id;
    }

   public int Member_id { get; set; }
   public string Name { get; set; }
   public string Email { get; set; }
   public string Password_hash { get; set; }
}
