using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        protected WorkoutRepository Repository {get;}

        public WorkoutController(WorkoutRepository repository) {
            Repository = repository;
        }

        [HttpGet("{workout_id}")]
        public ActionResult<Workout> GetWorkout([FromRoute] int workout_id)
        {
            Workout workout = Repository.GetWorkoutById(workout_id);
            if (workout == null) {
                return NotFound();
            }

            return Ok(workout);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Workout>> GetWorkouts()
        {
            return Ok(Repository.GetWorkouts());
        }

        [HttpGet("instructor/{instructor_id}")]
        public ActionResult<IEnumerable<Workout>> MyWorkouts([FromRoute] int instructor_id)
        {
            var workouts = Repository.MyWorkouts(instructor_id);
            if (workouts == null || !workouts.Any())
            {
                return NotFound($"No workouts found for instructor with id {instructor_id}");
            }

            return Ok(workouts);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Workout workout) {
            if (workout == null)
            {
                return BadRequest("Workout info not correct");
            }

            bool status = Repository.InsertWorkout(workout);
            if (status)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut()]
        public ActionResult UpdateWorkout([FromBody] Workout workout)
        {
            if (workout == null)
            {
                return BadRequest("Workout info not correct");
            }

            Workout existingWorkout = Repository.GetWorkoutById(workout.Workout_id);
            if (existingWorkout == null)
            {
                return NotFound($"Workout with id {workout.Workout_id} not found");
            }

            bool status = Repository.UpdateWorkout(workout);
            if (status)
            {
                return Ok();
            }

            return BadRequest("Something went wrong");
        }

        [HttpDelete("{workout_id}")]
        public ActionResult DeleteWorkout([FromRoute] int workout_id) {
            Workout existingWorkout = Repository.GetWorkoutById(workout_id);
            if (existingWorkout == null)
            {
                return NotFound($"Workout with id {workout_id} not found");
            }

            bool status = Repository.DeleteWorkout(workout_id);
            if (status)
            {
                return NoContent();
            }

            return BadRequest($"Unable to delete Workout with id {workout_id}");        
        }
    }
}
