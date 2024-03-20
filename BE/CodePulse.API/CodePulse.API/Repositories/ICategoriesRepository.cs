using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories
{
    public interface ICategoriesRepository
    {
        public Task<List<Category>> GetAllAsync();
        public Task<Category?> GetByIdAsync(Guid id);
        public Task<Category> AddAsync(Category category);
        public Task<Category?> UpdateAsync(Guid id, Category category);
        public Task<Category?> DeleteAsync(Guid id);
    }
}
