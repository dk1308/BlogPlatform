using CodePulse.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    public class CodePulseDBContext : DbContext
    {
        public CodePulseDBContext(DbContextOptions<CodePulseDBContext> options):base(options) 
        {
            
        }
        public DbSet<Category> Categories  { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<BlogImage> BlogImages { get; set; }
    }
}
