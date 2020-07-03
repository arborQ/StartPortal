using System.Collections.Generic;
using System.Linq;
using Alpaki.Database;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace Alpaki.WebApi.GraphQL
{
    public class DreamerQuery : ObjectGraphType<DreamerType>
    {
        public DreamerQuery(DatabaseContext databaseContext)
        {
            Name = "DreamerQuery";
            var arguments = new QueryArguments(new List<QueryArgument>
            {
                new QueryArgument<IdGraphType> { Name = "dreamerId" },
                new QueryArgument<StringGraphType> { Name = "searchName" }
            });

            Field<ListGraphType<DreamerType>>("dreamers", arguments: arguments, resolve: context =>
            {
                var dreamerQuery = databaseContext.Dreamers
                    .Include(d => d.User)
                    .Include(d => d.Dreams)
                        .ThenInclude(d => d.DreamCategory);

                var dreamerId = context.GetArgument<int?>("dreamerId");

                if (dreamerId.HasValue)
                {
                    return dreamerQuery.Where(d => d.DreamerId == dreamerId).ToListAsync();
                }

                var searchName = context.GetArgument<string>("searchName");

                if (!string.IsNullOrEmpty(searchName))
                {
                    return dreamerQuery.Where(d => (d.User.FirstName + d.User.LastName).Contains(searchName)).ToListAsync();
                }

                return dreamerQuery.ToListAsync();
            });
        }
    }
}
