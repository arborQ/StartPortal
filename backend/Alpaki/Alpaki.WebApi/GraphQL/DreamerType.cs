using Alpaki.Database.Models;
using GraphQL.Types;

namespace Alpaki.WebApi.GraphQL
{
    public class DreamerType : ObjectGraphType<Dreamer>
    {
        public DreamerType()
        {
            Field(d => d.Age);
            Field(d => d.DreamerId);
            Field<UserType>(nameof(Dreamer.User));
            Field<ListGraphType<DreamType>>(nameof(Dreamer.Dreams));
        }
    }
}
