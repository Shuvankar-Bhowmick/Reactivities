using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // Activities represent the table name that gets created in the database.
        public DbSet<Activity> Activities { get; set; }
    }
}