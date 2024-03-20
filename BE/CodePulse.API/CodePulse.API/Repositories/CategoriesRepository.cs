using AutoMapper;
using CodePulse.API.Data;
using CodePulse.API.Mapping;
using CodePulse.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly CodePulseDBContext dbContext;


        public CategoriesRepository(CodePulseDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        async Task<List<Category>> ICategoriesRepository.GetAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
        }

        async Task<Category?> ICategoriesRepository.GetByIdAsync(Guid id)
        {
            return await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        async Task<Category> ICategoriesRepository.AddAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();
            return category;
        }

        async Task<Category?> ICategoriesRepository.UpdateAsync(Guid id, Category category)
        {
            Category? existingCategory = await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (existingCategory == null)
                return null;

            existingCategory.Name = category.Name;
            existingCategory.UrlHandle = category.UrlHandle;
            await dbContext.SaveChangesAsync();
            return category;
        }

        async Task<Category?> ICategoriesRepository.DeleteAsync(Guid id)
        {
            Category existingCategory = await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (existingCategory == null)
                return null;
            dbContext.Categories.Remove(existingCategory);
            await dbContext.SaveChangesAsync();
            return existingCategory;
        }
    }
}
