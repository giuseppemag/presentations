using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace frontend.Controllers;

public class HomeController : Controller
{
    public HomeController()
    {
    }

    [HttpGet("/")]
    public IActionResult HomePage()
    {
        return View();
    }
}
