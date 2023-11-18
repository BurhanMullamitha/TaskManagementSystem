using TaskManagementSystem.API.Startup.Configurations;
using TaskManagementSystem.API.Startup.Extensions;
using TaskManagementSystem.API.Utilities.Middlewares;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.AddStandardServices();
builder.AddSwaggerServices();

builder.AddRepositoryServices();
builder.AddServices();

builder.AddLogging();
builder.AddExceptionHandling();
builder.AddValidations();
builder.AddFluentValidations();

var app = builder.Build();

app.ConfigureSwagger();

app.UseSerilogRequestLogging();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.MapControllers();

app.Run();
