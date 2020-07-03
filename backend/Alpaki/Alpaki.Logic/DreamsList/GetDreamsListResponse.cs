using Alpaki.CrossCutting.Enums;
using Newtonsoft.Json.Converters;
using System.Text.Json.Serialization;

namespace Alpaki.Logic.DreamsList
{
    public class GetDreamsListResponse
    {
        public string DisplayName { get; set; }

        public int Age { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public GenderEnum Gender { get; set; }
    }
}
