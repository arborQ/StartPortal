using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Alpaki.Database;
using Alpaki.Logic.Features.Dreamer.CreateDreamer;
using Alpaki.WebApi;
using AutoFixture;
using GraphQL;
using GraphQL.Client;
using GraphQL.Client.Abstractions;
using GraphQL.Client.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Xunit;
using GraphQL.Client.Serializer.Newtonsoft;

namespace Alpaki.Tests.IntegrationTests.DreamersControllerTests
{
    public class DreamerResponse
    {
        public long DreamerId { get; set; }
    }
    public class DreamersControllerTests
    {
        private readonly HttpClient _client;
        private readonly GraphQLHttpClient _graphQLHttpClient;
        private readonly Fixture _fixture;
        public DreamersControllerTests()
        {
            _client = new CustomWebApplicationFactory().CreateClient();
            //_graphQLHttpClient = new GraphQLHttpClient(new GraphQLHttpClientOptions(), new NewtonsoftJsonSerializer(), _client);
            _graphQLHttpClient = new GraphQLHttpClient($"{_client.BaseAddress}graphql", new NewtonsoftJsonSerializer());
            _fixture = new Fixture();
        }

        [Theory]
        //[InlineData(1)]
        //[InlineData(5)]
        //[InlineData(10)]
        //[InlineData(20)]
        [InlineData(200)]
        public async Task DreamersController_POST_CreateDreamer(int count)
        {
            // Arrange
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
            var query = @"
                    query DreamerQuery {
                      dreamers {
                        dreamerId
                        age
                        gender
                        firstName
                        lastName
                      }
                    }                    
                ";
            var dreamersRequest = new GraphQLRequest
            {
                Query = query
            };
            // Act
            var responses = await Task.WhenAll(requests.Select(r => _client.PostAsync($"/api/dreamers", r)));
            try
            {
                //var qlResponse = await _graphQLHttpClient.SendQueryAsync<DreamerResponse>(dreamersRequest);
                var data = new StringContent(query, Encoding.UTF8, "application/json");
                var xxx = await (await _client.GetAsync($"/graphql?query={query}")).Content.ReadAsStringAsync();
                if (xxx != null)
                {

                }
            }
            catch (Exception e)
            {
                if (e != null) { }
            }

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
