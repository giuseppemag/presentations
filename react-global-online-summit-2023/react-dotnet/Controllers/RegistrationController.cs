using Microsoft.AspNetCore.Mvc;
using Services;

namespace frontend.Controllers
{
  [Route("api/registration")]
  public class RegistrationController : Controller
  {
    private readonly IRegistrationService RegistrationService;
    public RegistrationController(IRegistrationService registrationService)
    {
      RegistrationService = registrationService;
    }

    [HttpPost]
    public IActionResult Register([FromBody] Person person)
    {
      RegistrationService.Register(person);
      return Ok();
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
      var people = RegistrationService.GetAll();
      return Ok(people);
    }
  }
}