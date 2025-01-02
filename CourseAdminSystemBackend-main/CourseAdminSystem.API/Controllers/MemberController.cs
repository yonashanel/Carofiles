using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        protected MemberRepository Repository {get;}

        public MemberController(MemberRepository repository) {
            Repository = repository;
        }

        [HttpGet("{member_id}")]
        public ActionResult<Member> GetMember([FromRoute] int member_id)
        {
            Member member = Repository.GetMemberById(member_id);
            if (member == null) {
                return NotFound();
            }

            return Ok(member);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Member>> GetMembers()
        {
            return Ok(Repository.GetMembers());
        }

        [HttpPost]
        public ActionResult Post([FromBody] Member member) {
            if (member == null)
            {
                return BadRequest("Member info not correct");
            }

            bool status = Repository.InsertMember(member);
            if (status)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut()]
        public ActionResult UpdateMember([FromBody] Member member)
        {
            if (member == null)
            {
                return BadRequest("Member info not correct");
            }

            Member existinMember = Repository.GetMemberById(member.Member_id);
            if (existinMember == null)
            {
                return NotFound($"Member with id {member.Member_id} not found");
            }

            bool status = Repository.UpdateMember(member);
            if (status)
            {
                return Ok();
            }

            return BadRequest("Something went wrong");
        }

        [HttpDelete("{member_id}")]
        public ActionResult DeleteMember([FromRoute] int member_id) {
            Member existingMember = Repository.GetMemberById(member_id);
            if (existingMember == null)
            {
                return NotFound($"Member with id {member_id} not found");
            }

            bool status = Repository.DeleteMember(member_id);
            if (status)
            {
                return NoContent();
            }

            return BadRequest($"Unable to delete Member with id {member_id}");        
        }
    }
}
