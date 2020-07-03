using MediatR;

namespace Alpaki.Logic.DreamsList
{
    public class GetDreamsListRequest : IRequest<GetDreamsListResponse>
    {
        public long DreamerId { get; set; }
    }
}
