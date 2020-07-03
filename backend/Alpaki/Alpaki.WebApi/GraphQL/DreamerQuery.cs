using System.Collections.Generic;
using System.Linq;
using Alpaki.Database;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace Alpaki.WebApi.GraphQL
{
    public class DreamerQuery : ObjectGraphType<DreamerType>
    {
        public DreamerQuery(DatabaseContext databaseContext, DatabaseContext userDatabaseContext)
        {
            Name = "DreamerQuery";
            var arguments = new QueryArguments(new List<QueryArgument>
            {
                new QueryArgument<IdGraphType> { Name = "dreamerId" },
                new QueryArgument<StringGraphType> { Name = "searchName" }
            });

            var userArguments = new QueryArguments(new List<QueryArgument>
            {
                new QueryArgument<IdGraphType> { Name = "userId" },
            });

            Field<ListGraphType<UserType>>("users", arguments: userArguments, resolve: context =>
            {
                var userQuery = userDatabaseContext.Users;

                var userId = context.GetArgument<int?>("userId");

                if (userId.HasValue)
                {
                    return userQuery.Where(u => u.UserId == userId).ToListAsync();
                }

                return userQuery.ToListAsync();
            });

            Field<ListGraphType<DreamerType>>("dreamers", arguments: arguments, resolve: context =>
            {
                var dreamerQuery = databaseContext.Dreamers
                    .Include(d => d.Dreams)
                        .ThenInclude(d => d.DreamCategory)
                    .Include(d => d.Dreams)
                        .ThenInclude(d => d.RequiredSteps);

                var dreamerId = context.GetArgument<int?>("dreamerId");

                if (dreamerId.HasValue)
                {
                    return dreamerQuery.Where(d => d.DreamerId == dreamerId).ToListAsync();
                }

                var searchName = context.GetArgument<string>("searchName");

                if (!string.IsNullOrEmpty(searchName))
                {
                    return dreamerQuery.Where(d => (d.FirstName + d.LastName).Contains(searchName)).ToListAsync();
                }

                return dreamerQuery.ToListAsync();
            });
        }
    }
}
