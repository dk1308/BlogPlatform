using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    public class AuthDBContext : IdentityDbContext
    {
        public AuthDBContext(DbContextOptions<AuthDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Create the Reader and Writer role
            string readerRoleId = "71fa2cac-e07f-4226-8730-2fb2dbf6a587";
            string writerRoleId = "0804a9fe-664f-4de7-846d-397b8d2e871f";
            var roles = new List<IdentityRole>()
            {
                new IdentityRole
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new IdentityRole
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                }
            };
            
            // Seed the roles to database
            builder.Entity<IdentityRole>().HasData(roles);

            // Create admin identity
            string adminId = "201a51ff-ded1-43ee-8336-46b5423322c5";
            var admin = new IdentityUser
            {
                Id = adminId,
                UserName = "admin",
                Email = "admin@codepulse.com",
                NormalizedUserName = "admin".ToUpper(),
                NormalizedEmail = "admin@codepulse.com".ToUpper()
            };
            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");

            // Seed the admin to database
            builder.Entity<IdentityUser>().HasData(admin);

            // Seed the user-role to admin to database
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new ()
                {
                    UserId = adminId,
                    RoleId = readerRoleId
                },
                new ()
                {
                    UserId = adminId,
                    RoleId = writerRoleId
                }
            };
            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }
    }
}
