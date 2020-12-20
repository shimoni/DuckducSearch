using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBAssignment.ViewModels
{
    public class TopicResponseVM
    {
        public int PageNumber { get; set; }
        public int TotalPages { get; set; }
        public int TotalResults { get; set; }
        public List<TopicVM> Results { get; set; }
    }
}
