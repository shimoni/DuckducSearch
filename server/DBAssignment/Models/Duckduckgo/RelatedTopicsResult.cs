using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DBAssignment.Models.Duckduckgo
{
    public class RelatedTopicsResult
    {
        public string Text { get; set; }
        public string FirstURL { get; set; }
        public List<RelatedTopicsResult> Topics { get; set; }
        public bool isDeepObject => Topics?.Any() ?? false;
    }
}
