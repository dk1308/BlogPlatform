using AutoMapper;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.Dtos;
using CodePulse.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogImagesController : ControllerBase
    {
        private readonly IBlogImagesRepository blogImagesRepository;
        private readonly IMapper mapper;

        public BlogImagesController(IBlogImagesRepository blogImagesRepository,
            IBlogPostsRepository blogPostsRepository,
            IMapper mapper)
        {
            this.blogImagesRepository = blogImagesRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(mapper.Map<List<BlogImageDto>>( await this.blogImagesRepository.GetImages()));
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] string fileName,
            [FromForm] string title)
        {
            // Firstly, validate extension and length of file
            ValidateBlogImage(file);
            // If model state is valid, continue, else return bad request
            if (ModelState.IsValid)
            {
                // Assign 4 properties to blog image
                var blogImage = new BlogImage
                {
                    FileName = fileName,
                    Title = title,
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    DateCreated = DateTime.Now
                };

                // Map a complete blog image domain to to then return
                var blogImageDto = mapper.Map<BlogImageDto>(await blogImagesRepository.UploadImage(file, blogImage));
                return Ok(blogImageDto);
            }
            return BadRequest(ModelState);
        }

        private void ValidateBlogImage(IFormFile file)
        {
            var allowExtension = new string[] { ".jpg", ".png" };
            if (!allowExtension.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("File extension", "File extension is not allowed");
            }

            if (file.Length > 10485760)
            {
                ModelState.AddModelError("File size", "File size must not larger than 10MB");
            }
        }
    }
}
