using Alpaki.CrossCutting.Enums;

namespace Alpaki.Logic.DreamsList
{
    public class GetDreamsListResponse
    {
        public string DisplayName { get; set; }

        public int Age { get; set; }

        public GenderEnum Gender { get; set; }
    }
}
