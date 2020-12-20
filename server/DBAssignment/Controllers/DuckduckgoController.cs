using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DBAssignment.Duckduckgo;
using DBAssignment.Models.Duckduckgo;
using DBAssignment.Utils;
using DBAssignment.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DBAssignment.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DuckduckgoController : ControllerBase
    {
        private readonly IDuckduckgoService _duckduckgoService;

        public DuckduckgoController(IDuckduckgoService duckduckgoService)
        {
            _duckduckgoService = duckduckgoService;
        }

        [HttpGet("GetTopics")]
        public async Task<IActionResult> GetTopics([FromQuery] string q = "dan&bradstreet", [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {

            try
            {
                TopicResponseVM res = await _duckduckgoService.GetTopics(q, pageSize, pageNumber);

                return Ok(ApiResponseHandler.Success(res));
            }
            catch (Exception e)
            {
                return BadRequest(ApiResponseHandler.Failure(HttpStatusCode.InternalServerError, "error"));
            }

        }

    }
}