using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Alpaki.Logic.Features.Dreamer.CreateDreamer;
using Alpaki.WebApi;
using AutoFixture;
using GraphQL;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Xunit;

namespace Alpaki.Tests.IntegrationTests.DreamersControllerTests
{
    public class DreamersControllerTests
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private readonly Fixture _fixture;
        public DreamersControllerTests()
        {
            _factory = new CustomWebApplicationFactory();
            _fixture = new Fixture();
        }

        [Theory]
        [InlineData(1)]
        [InlineData(5)]
        [InlineData(10)]
        [InlineData(20)]
        [InlineData(200)]
        public async Task DreamersController_POST_CreateDreamer(int count)
        {
            // Arrange
            var client = _factory.CreateClient();
            var random = new Random();
            var requests = _fixture
                .Build<CreateDreamerRequestFake>()
                .With(d => d.Age, random.Next(1, 119))
                .CreateMany(count)
                .Select(dreamer =>
                {
                    var json = JsonConvert.SerializeObject(dreamer);
                    var data = new StringContent(json, Encoding.UTF8, "application/json");

                    return data;
                });
            var dreamersRequest = new GraphQLRequest
            {
                Query = @"
                    {
                        hero {
                            name
                        }
                    }"
            };
            // Act
            var responses = await Task.WhenAll(requests.Select(r => client.PostAsync($"/api/dreamers", r)));

            // Assert
            foreach (var response in responses)
            {
                response.EnsureSuccessStatusCode(); // Status Code 200-299
                Assert.Equal("application/json; charset=utf-8",
                    response.Content.Headers.ContentType.ToString());
            }
        }
    }
}
