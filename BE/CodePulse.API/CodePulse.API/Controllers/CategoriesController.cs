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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesRepository repository;
        private readonly IMapper mapper;

        public CategoriesController(ICategoriesRepository repository,IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            // Get all categories domain
            var categoriesDomain = await repository.GetAllAsync();
            // Map them to categories dto then return
            return Ok(mapper.Map<List<CategoryDto>>(categoriesDomain));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Get category by id
            var categoryDomain = await repository.GetByIdAsync(id);
            // Map it to categories dto then return
            return Ok(mapper.Map<CategoryDto>(categoryDomain));
        }

        [HttpPost]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> AddNewCategory([FromBody] AddCategoryRequestDto addCategoryRequestDto)
        {
            // Map add category request dto to category domain
            var categoryDomain = mapper.Map<Category>(addCategoryRequestDto);
            // Add category domain to database
            var newCategoryDomain = await repository.AddAsync(categoryDomain);
            // Map it to categories dto then return
            var categoryDto = mapper.Map<CategoryDto>(newCategoryDomain);
            return CreatedAtAction(nameof(GetById), new { categoryDomain.Id }, categoryDto);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            // Map update category request dto to category domain
            var categoryDomain = mapper.Map<Category>(updateCategoryRequestDto);
            // Find and update category domain in database
            var updatedCategoryDomain = await repository.UpdateAsync(id, categoryDomain);
            // If null return bad request
            if (updatedCategoryDomain == null)
                return BadRequest("Can not find category");
            // Map it to categories dto then return
            var categoryDto = mapper.Map<CategoryDto>(updatedCategoryDomain);
            return Ok(categoryDto);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            // Find and delete category
            var deletedCategoryDomain = await repository.DeleteAsync(id);
            // If null return bad request
            if (deletedCategoryDomain == null)
                return BadRequest("Can not find category");
            // Map it to categories dto then return
            var categoryDto = mapper.Map<CategoryDto>(deletedCategoryDomain);
            return Ok(categoryDto);
        } 
    }
}
