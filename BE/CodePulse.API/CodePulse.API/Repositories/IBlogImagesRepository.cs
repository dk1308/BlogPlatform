using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories
{
    public interface IBlogImagesRepository
    {
        Task<BlogImage> UploadImage(IFormFile file, BlogImage blogImage);
        Task<IEnumerable<BlogImage>> GetImages();
    }
}
