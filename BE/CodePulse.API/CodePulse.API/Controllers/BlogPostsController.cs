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
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostsRepository repository;
        private readonly ICategoriesRepository categoriesRepository;
        private readonly IMapper mapper;

        public BlogPostsController(IBlogPostsRepository repository
            , ICategoriesRepository categoriesRepository
            , IMapper mapper)
        {
            this.repository = repository;
            this.categoriesRepository = categoriesRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(mapper.Map<List<BlogPostDto>>(await this.repository.GetAllAsync()));
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Get blog post by id
            var existBlogPost = await this.repository.GetByIdAsync(id);
            // If null return error
            if (existBlogPost == null)
                return BadRequest("Can not find blog post");
            // If not null map from domain to dto then return
            return Ok(mapper.Map<BlogPostDto>(existBlogPost));
        }

        
        [HttpGet]
        [Route("{url}")]
        public async Task<IActionResult> GetByUrl([FromRoute] string url)
        {
            if(url!= "")
            {
                var existBlogPost = await this.repository.GetByUrlAsync(url);
                if (existBlogPost != null)
                    return Ok(mapper.Map<BlogPostDto>(existBlogPost));
            }
            return BadRequest("Blog post does not exist!");
        }

        [HttpPost]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> AddNew([FromBody] AddBlogPostRequestDto blogPostDto)
        {
            // Map add blog post request dto to domain
            var blogPostDomain = mapper.Map<BlogPost>(blogPostDto);
            blogPostDomain.Categories = new List<Category>();
            foreach (var cateGuidItem in blogPostDto.Categories)
            {
                var existCategory = await this.categoriesRepository.GetByIdAsync(cateGuidItem);
                if (existCategory is not null)
                {
                    blogPostDomain.Categories.Add(existCategory);
                }
            }
            // Add to db
            var newBlogPost = await this.repository.AddAsync(blogPostDomain);

            // Map blog post domain to dto back
            var newBlogPostDto = mapper.Map<BlogPostDto>(newBlogPost);

            // Map new blog post domain to dto then return
            return CreatedAtAction(nameof(GetById), new {newBlogPostDto.Id}, newBlogPostDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateBlogPostRequestDto blogPostDto)
        {
            // Map update blog post dto to domain
            var blogPostDomain = mapper.Map<BlogPost>(blogPostDto);
            blogPostDomain.Categories = new List<Category>();
            foreach (var categoryIdItem in blogPostDto.Categories)
            {
                var categoryItem = await this.categoriesRepository.GetByIdAsync(categoryIdItem);
                if (categoryItem != null)
                    blogPostDomain.Categories.Add(categoryItem);
            }

            // Update 
            var updatedBlogPost = await this.repository.UpdateAsync(id, blogPostDomain);

            // Check if updated blog post null, return bad request
            if (updatedBlogPost is null) return BadRequest("Block post does not exist");

            // Map back to dto then return
            return Ok(mapper.Map<BlogPostDto>(updatedBlogPost));
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            // Find blog post by id, if null then return bad request
            var blogPost = await this.repository.GetByIdAsync(id);

            if (blogPost is null) return BadRequest();

            // If not null, then delete and return ok with blog post dto;
            return Ok(mapper.Map<BlogPostDto>(await this.repository.DeleteAsync(id)));
        }
    }
}
