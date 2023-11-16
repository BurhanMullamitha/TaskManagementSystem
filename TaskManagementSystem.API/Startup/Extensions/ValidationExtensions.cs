using TaskManagementSystem.API.Utilities.ErrorResponses;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace TaskManagementSystem.API.Startup.Extensions;

public static class ValidationExtensions
{
    public static void AddValidations(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = ErrorResponse.BadRequest;
        });
    }

    public static void AddFluentValidations(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
