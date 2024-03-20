using AutoMapper;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.Dtos;

namespace CodePulse.API.Mapping
{
    public class ModelMapProfile:Profile
    {
        public ModelMapProfile()
        {
            CreateMap<CategoryDto, Category>().ReverseMap();
            CreateMap<AddCategoryRequestDto, Category>().ReverseMap();
            CreateMap<UpdateCategoryRequestDto, Category>().ReverseMap();

            CreateMap<BlogPostDto, BlogPost>().ReverseMap();
            CreateMap<AddBlogPostRequestDto, BlogPost>()
                .ForMember(addBlog => addBlog.Categories, opt => opt.Ignore());
            CreateMap<UpdateBlogPostRequestDto, BlogPost>()
                .ForMember(updateBlog => updateBlog.Categories, opt => opt.Ignore());
            CreateMap<BlogImageDto, BlogImage>().ReverseMap();
        }
    }
}
