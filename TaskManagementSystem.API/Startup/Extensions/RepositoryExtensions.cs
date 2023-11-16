using TaskManagementSystem.Dal.Repositories;
using TaskManagementSystem.Domain.Abstractions.Repositories;

namespace TaskManagementSystem.API.Startup.Extensions;

public static class RepositoryExtensions
{
    public static void AddRepositoryServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ITaskRepository, TaskRepository>();
    }
}
