using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories
{
    public class BlogPostsRepository : IBlogPostsRepository
    {
        private readonly CodePulseDBContext dBContext;

        public BlogPostsRepository(CodePulseDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        public async Task<BlogPost> AddAsync(BlogPost blogPost)
        {
            await this.dBContext.AddAsync(blogPost);
            await this.dBContext.SaveChangesAsync();
            return blogPost;
        }

        public async Task<BlogPost?> DeleteAsync(Guid id)
        {
            var existBlogPost = await this.dBContext.BlogPosts
                .Include(b => b.Categories)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (existBlogPost == null) return null;

            this.dBContext.BlogPosts.Remove(existBlogPost);
            await this.dBContext.SaveChangesAsync();

            

            return existBlogPost;

        }

        public async Task<List<BlogPost>> GetAllAsync()
        {
            return await this.dBContext.BlogPosts.Include(b => b.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetByIdAsync(Guid id)
        {
            var blogPost = await this.dBContext.BlogPosts.Include(b => b.Categories).FirstOrDefaultAsync(b => b.Id == id);
            return blogPost;
        }

        public async Task<BlogPost?> GetByUrlAsync(string url)
        {
            return await this.dBContext.BlogPosts.FirstOrDefaultAsync(b => b.UrlHandle.Equals(url));
        }

        public async Task<BlogPost?> UpdateAsync(Guid id, BlogPost blogPost)
        {
            var existBlogPost = await this.dBContext.BlogPosts.Include(b => b.Categories).FirstOrDefaultAsync(b => b.Id == id);
            if (existBlogPost == null) return null;

            existBlogPost.Title = blogPost.Title;
            existBlogPost.ShortDescription = blogPost.ShortDescription;
            existBlogPost.Author = blogPost.Author;
            existBlogPost.Content = blogPost.Content;
            existBlogPost.FeaturedImageUrl = blogPost.FeaturedImageUrl;
            existBlogPost.UrlHandle = blogPost.UrlHandle;
            existBlogPost.PublishedDate = blogPost.PublishedDate;
            existBlogPost.Categories = blogPost.Categories;
            existBlogPost.isVisible = blogPost.isVisible;

            await this.dBContext.SaveChangesAsync();

            return existBlogPost;
        }

        
    }
}
