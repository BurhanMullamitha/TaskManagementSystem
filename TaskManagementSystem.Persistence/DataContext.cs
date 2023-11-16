using Microsoft.EntityFrameworkCore;
using Task = TaskManagementSystem.Domain.Models.Task;

namespace TaskManagementSystem.Persistence;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) { }

    public DbSet<Task> Tasks { get; set; }
}
