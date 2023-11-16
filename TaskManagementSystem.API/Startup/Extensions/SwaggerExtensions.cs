using Microsoft.OpenApi.Models;

namespace TaskManagementSystem.API.Startup.Extensions;

public static class SwaggerExtensions
{
    public static void AddSwaggerServices(this WebApplicationBuilder builder)
    {
        OpenApiInfo apiInfo_v0 = Getv0OpenApiInfo();

        builder.Services.AddSwaggerGen(opts =>
        {
            opts.SwaggerDoc("v0", apiInfo_v0);
        });
    }

    private static OpenApiInfo Getv0OpenApiInfo()
    {
        string title = "TaskManagementSystem API";
        string description = "API for Managing Tasks";

        return new OpenApiInfo
        {
            Version = "v0",
            Title = $"{title} v0",
            Description = description,
        };
    }
}
