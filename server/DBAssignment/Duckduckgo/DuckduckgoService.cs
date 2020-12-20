
using DBAssignment.Models.Duckduckgo;
using DBAssignment.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text.Json;
using System.Threading.Tasks;

namespace DBAssignment.Duckduckgo
{
    public class DuckduckgoService : IDuckduckgoService
    {
        private readonly IHttpClientFactory _clientFactory;

        public DuckduckgoService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<TopicResponseVM> GetTopics(string searchString, int pageSize, int pageNumber)
        {
            var topics = await GetTopics(searchString);
            var results = FlatResults(topics);

            if (pageSize > 0 && pageNumber > 0)
            {
                return new TopicResponseVM
                {
                    PageNumber = pageNumber,
                    TotalResults = results.Count,
                    TotalPages = (int)Math.Floor((decimal)(results.Count / pageSize)) + 1,
                    Results = results.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList()
                };
            }
            return new TopicResponseVM
            {
                PageNumber = pageNumber,
                TotalResults = 0,
                TotalPages = 0,
                Results = new List<TopicVM>()
            };
        }

        public async Task<RelatedTopicsResponse> GetTopics(string searchString)
        {
            var response = await GetDucducgoRelatedTopics<RelatedTopicsResponse>(searchString);
            return response;
        }

        public async Task<T> GetDucducgoRelatedTopics<T>(string searchString)
        {
            var response = await _clientFactory.CreateClient("duckduck").GetAsync($"?q={searchString}&format=json");

            response.EnsureSuccessStatusCode();

            using var responseStream = await response.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync
                <T>(responseStream);
        }

        private List<TopicVM> FlatResults(RelatedTopicsResponse reults)
        {
            return reults.RelatedTopics.SelectMany(topic => Map(topic)).OrderBy(t => t.Text).ToList();
        }

        private List<TopicVM> Map(RelatedTopicsResult topic)
        {
            if (!topic.isDeepObject)
            {
                return new List<TopicVM>()
                {
                   new TopicVM
                   {
                       Text = topic.Text,
                       Link = topic .FirstURL
                   }
                };
            }
            else
            {
                return topic.Topics.SelectMany(t => Map(t)).ToList();
            }
        }
    }
}
