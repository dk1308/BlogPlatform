using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories
{
    public interface IBlogPostsRepository
    {
        Task<List<BlogPost>> GetAllAsync();
        Task<BlogPost?> GetByIdAsync(Guid id);
        Task<BlogPost> AddAsync(BlogPost blogPost);
        Task<BlogPost?> UpdateAsync(Guid id, BlogPost blogPost);
        Task<BlogPost?> DeleteAsync(Guid id);
        
        Task<BlogPost?> GetByUrlAsync(string url); 
    }
}
