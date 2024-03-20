using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories
{
    public class BlogImagesRepository : IBlogImagesRepository
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpAccessor;
        private readonly CodePulseDBContext dBContext;

        public BlogImagesRepository(IWebHostEnvironment webHostEnvironment,
            IHttpContextAccessor httpAccessor,
            CodePulseDBContext dBContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpAccessor = httpAccessor;
            this.dBContext = dBContext;
        }

        public async Task<IEnumerable<BlogImage>> GetImages()
        {
            return await this.dBContext.BlogImages.ToListAsync();
        }

        public async Task<BlogImage> UploadImage(IFormFile file, BlogImage blogImage)
        {
            // 1- Save to local storage
            var localPath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{blogImage.FileName}{blogImage.FileExtension}");
            using var fileStream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(fileStream);
            // 2- Save to database
            // url path: https://codepulse.com/Images/fileName.fileExtension
            var httpRequest = httpAccessor.HttpContext.Request;
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{blogImage.FileName}{blogImage.FileExtension}";
            blogImage.Url = urlPath;
            await dBContext.BlogImages.AddAsync(blogImage);
            await dBContext.SaveChangesAsync();

            return blogImage;
        }

    }
}
