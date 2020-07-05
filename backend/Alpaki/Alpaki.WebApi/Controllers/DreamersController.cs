using Alpaki.Logic.DreamsList;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Alpaki.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DreamersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DreamersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<GetDreamsListResponse> GetDreamer([FromQuery]GetDreamsListRequest request) {

            var response = await _mediator.Send(request);

            return response;
        }
    }
}
