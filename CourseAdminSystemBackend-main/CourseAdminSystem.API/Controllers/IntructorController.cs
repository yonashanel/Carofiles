using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        protected InstructorRepository Repository {get;}

        public InstructorController(InstructorRepository repository) {
            Repository = repository;
        }

        [HttpGet("{instructor_id}")]
        public ActionResult<Instructor> GetInstructor([FromRoute] int instructor_id)
        {
            Instructor instructor = Repository.GetInstructorById(instructor_id);
            if (instructor == null) {
                return NotFound();
            }

            return Ok(instructor);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Instructor>> GetInstructors()
        {
            return Ok(Repository.GetInstructors());
        }

        [HttpPost]
        public ActionResult Post([FromBody] Instructor instructor) {
            if (instructor == null)
            {
                return BadRequest("Instructor info not correct");
            }

            bool status = Repository.InsertInstructor(instructor);
            if (status)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut()]
        public ActionResult UpdateInstructor([FromBody] Instructor instructor)
        {
            if (instructor == null)
            {
                return BadRequest("Instructor info not correct");
            }

            Instructor existingInstructor = Repository.GetInstructorById(instructor.Instructor_id);
            if (existingInstructor == null)
            {
                return NotFound($"Instructor with id {instructor.Instructor_id} not found");
            }

            bool status = Repository.UpdateInstructor(instructor);
            if (status)
            {
                return Ok();
            }

            return BadRequest("Something went wrong");
        }

        [HttpDelete("{instructor_id}")]
        public ActionResult DeleteInstructor([FromRoute] int instructor_id) {
            Instructor existingInstructor = Repository.GetInstructorById(instructor_id);
            if (existingInstructor == null)
            {
                return NotFound($"Instructor with id {instructor_id} not found");
            }

            bool status = Repository.DeleteInstructor(instructor_id);
            if (status)
            {
                return NoContent();
            }

            return BadRequest($"Unable to delete Instructor with id {instructor_id}");        
        }
    }
}
