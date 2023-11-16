using TaskManagementSystem.Domain.Abstractions.Services;
using TaskManagementSystem.Service;

namespace TaskManagementSystem.API.Startup.Extensions;

public static class ServiceExtensions
{
    public static void AddServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ITaskService, TaskService>();
    }
}
