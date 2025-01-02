using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseAdminSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        protected BookingRepository Repository {get;}

        public BookingController(BookingRepository repository) {
            Repository = repository;
        }

        [HttpGet("{booking_id}")]
        public ActionResult<Booking> GetBooking([FromRoute] int booking_id)
        {
            Booking booking = Repository.GetBookingById(booking_id);
            if (booking == null) {
                return NotFound();
            }

            return Ok(booking);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Booking>> GetBookings()
        {
            return Ok(Repository.GetBookings());
        }

        [HttpPost]
        public ActionResult Post([FromBody] Booking booking) {
            if (booking == null)
            {
                return BadRequest("Booking info not correct");
            }

            bool status = Repository.InsertBooking(booking);
            if (status)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut()]
        public ActionResult UpdateBooking([FromBody] Booking booking)
        {
            if (booking == null)
            {
                return BadRequest("Booking info not correct");
            }

            Booking existingBooking = Repository.GetBookingById(booking.Booking_id);
            if (existingBooking == null)
            {
                return NotFound($"Booking with id {booking.Booking_id} not found");
            }

            bool status = Repository.UpdateBooking(booking);
            if (status)
            {
                return Ok();
            }

            return BadRequest("Something went wrong");
        }

        [HttpDelete("{booking_id}")]
        public ActionResult DeleteBooking([FromRoute] int booking_id) {
            Booking existingBooking = Repository.GetBookingById(booking_id);
            if (existingBooking == null)
            {
                return NotFound($"Booking with id {booking_id} not found");
            }

            bool status = Repository.DeleteBooking(booking_id);
            if (status)
            {
                return NoContent();
            }

            return BadRequest($"Unable to delete Booking with id {booking_id}");        
        }
    }
}
