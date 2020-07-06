﻿using Alpaki.CrossCutting.Enums;
using MediatR;

namespace Alpaki.Logic.Features.Dreamer.CreateDreamer
{
    public class CreateDreamerRequest : IRequest<CreateDreamerResponse>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public GenderEnum Gender { get; set; }

        public string DreamUrl { get; set; }
    }
}
