﻿using CodePulse.API.Models.Domain;

namespace CodePulse.API.Models.Dtos
{
    public class AddBlogPostRequestDto
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public string FeaturedImageUrl { get; set; }
        public string UrlHandle { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Author { get; set; }
        public bool isVisible { get; set; }
        public Guid[] Categories { get; set; }
    }
}
