using Alpaki.Database.Models;
using GraphQL.Types;

namespace Alpaki.WebApi.GraphQL
{
    public class DreamType : ObjectGraphType<Dream>
    {
        public DreamType()
        {
            Field(d => d.Tags);
            Field<DreamCategoryType>(nameof(Dream.DreamCategory));
        }
    }
}
