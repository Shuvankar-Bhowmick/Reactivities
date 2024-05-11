using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        // With the IdentityDbContext in place we don't need to create a new DbSet for our Identities as a lot of it will be taken care of by the IdentityDbContext class itself.
        public DataContext(DbContextOptions options)
            : base(options) { }

        // Activities represent the table name that gets created in the database.
        public DbSet<Activity> Activities { get; set; }
    }
}
