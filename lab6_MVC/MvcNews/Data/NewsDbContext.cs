using MvcNews.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
namespace MvcNews.Data
{
    public class NewsDbContext : DbContext
    {
        public NewsDbContext(DbContextOptions<NewsDbContext> options) :
        base(options)
        { }
        public DbSet<NewsItem> News { get; set; } = null!;
    }

}
