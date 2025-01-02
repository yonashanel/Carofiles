using System;
using CourseAdminSystem.Model.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;
using NpgsqlTypes;

namespace CourseAdminSystem.Model.Repositories;

public class MemberRepository : BaseRepository
{
   public MemberRepository(IConfiguration configuration) : base(configuration)
   {
   }

   public Member GetMemberById(int member_id)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from member where member_id = @member_id";

         cmd.Parameters.Add("@member_id", NpgsqlDbType.Integer).Value = member_id;

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            if (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               return new Member(Convert.ToInt32(data["member_id"]))
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
   public List<Member> GetMembers()
   {
      NpgsqlConnection dbConn = null;
      var members = new List<Member>();
      try
      {
         //create a new connection for database
         dbConn = new NpgsqlConnection(ConnectionString);

         //creating an SQL command
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = "select * from member";

         //call the base method to get data
         var data = GetData(dbConn, cmd);

         if (data != null)
         {
            while (data.Read()) //every time loop runs it reads next like from fetched rows
            {
               Member s = new Member(Convert.ToInt32(data["member_id"]))
               {
                  Name = data["name"].ToString(),                  
                  Email = data["email"].ToString(),
                  Password_hash = data["password_hash"].ToString(),
               };

               members.Add(s);
            }
         }

         return members;
      }
      finally
      {
         dbConn?.Close();
      }
   }

   //add a new Member
   public bool InsertMember(Member s)
   {
      NpgsqlConnection dbConn = null;
      try
      {
         dbConn = new NpgsqlConnection(ConnectionString);
         var cmd = dbConn.CreateCommand();
         cmd.CommandText = @"
insert into member
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

   public bool UpdateMember(Member s)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
update member set
    name=@name,
    email=@email,
    password_hash=@password_hash
where
member_id = @member_id";

      cmd.Parameters.AddWithValue("@name", NpgsqlDbType.Text, s.Name);         
      cmd.Parameters.AddWithValue("@email", NpgsqlDbType.Text, s.Email);
      cmd.Parameters.AddWithValue("@password_hash", NpgsqlDbType.Text, s.Password_hash);
      cmd.Parameters.AddWithValue("@member_id", NpgsqlDbType.Integer, s.Member_id);

      bool result = UpdateData(dbConn, cmd);
      return result;
   }

   public bool DeleteMember(int member_id)
   {
      var dbConn = new NpgsqlConnection(ConnectionString);
      var cmd = dbConn.CreateCommand();
      cmd.CommandText = @"
delete from member
where member_id = @member_id
";

      //adding parameters in a better way
      cmd.Parameters.AddWithValue("@member_id", NpgsqlDbType.Integer, member_id);

      //will return true if all goes well
      bool result = DeleteData(dbConn, cmd);

      return result;
   }
}
