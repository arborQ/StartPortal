using System;
using System.Threading.Tasks;
using Alpaki.WebApi;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Alpaki.Tests.IntegrationTests
{
    public class DreamersControllerTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public DreamersControllerTests(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Theory]
        [InlineData(1)]
        public async Task DreamersController_GET_FetchDreamerById(long dreamerId)
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync($"/api/dreamers?dreamerId={dreamerId}");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }
    }
}
