using TaskManagementSystem.API.Utilities.Middlewares;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Persistence;
using Serilog;

namespace TaskManagementSystem.API.Startup.Extensions;

public static class StandardExtensions
{
    public static void AddStandardServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
        });
    }

    public static void AddLogging(this WebApplicationBuilder builder)
    {
        builder.Host.UseSerilog((context, configuration) =>
        configuration.ReadFrom.Configuration(context.Configuration));
    }

    public static void AddExceptionHandling(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<GlobalExceptionHandlingMiddleware>();
    }
}
