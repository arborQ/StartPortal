using Alpaki.CrossCutting.Exceptions;
using Alpaki.Database;
using Alpaki.Database.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Alpaki.Logic.DreamsList
{
    public class GetDreamsListHandler : IRequestHandler<GetDreamsListRequest, GetDreamsListResponse>
    {
        private readonly DatabaseContext _databaseContext;

        public GetDreamsListHandler(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<GetDreamsListResponse> Handle(GetDreamsListRequest request, CancellationToken cancellationToken)
        {
            var dremer = await _databaseContext.Dreamers.FirstOrDefaultAsync(d => d.DreamerId == request.DreamerId);

            if (dremer == null)
            {
                throw new EntityNotFoundException<Dreamer>(request.DreamerId);
            }

            return new GetDreamsListResponse { Age = dremer.Age, Gender = dremer.Gender };
        }
    }
}
