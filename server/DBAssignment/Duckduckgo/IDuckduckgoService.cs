using DBAssignment.Models.Duckduckgo;
using DBAssignment.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBAssignment.Duckduckgo
{
    public interface IDuckduckgoService
    {
        Task<TopicResponseVM> GetTopics(string searchString, int pageSize, int pageNumber);

        Task<RelatedTopicsResponse> GetTopics(string searchString);

        Task<T> GetDucducgoRelatedTopics<T>(string searchString);


    }
}
