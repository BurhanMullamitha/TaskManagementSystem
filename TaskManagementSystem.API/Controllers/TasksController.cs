using TaskManagementSystem.API.Utilities.ErrorResponses;
using TaskManagementSystem.Domain.Abstractions.Services;
using TaskManagementSystem.Domain.Enums;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Task = TaskManagementSystem.Domain.Models.Task;

namespace TaskManagementSystem.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : Controller
{
    private readonly ITaskService _taskService;
    private readonly IValidator<Task> _validator;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ITaskService taskService, IValidator<Task> validator, ILogger<TasksController> logger)
    {
        _taskService = taskService;
        _validator = validator;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        List<Task> tasks = await _taskService.GetTasksAsync();

        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        Task? task = await _taskService.GetTaskAsync(id);
        
        if(task == null) return ErrorResponse.NotFound(id);
        
        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Task task)
    {
        ValidationResult result = _validator.Validate(task);
        if (!result.IsValid)
        {
            return ErrorResponse.BadRequest(result.ToDictionary());
        }

        Task createdTask = await _taskService.CreateTaskAsync(task);

        if (createdTask.Priority == EPriority.High)
        {
            _logger.LogCritical($"A task with high priority was created. Task ID: {createdTask.Id}");
        }

        return Ok(createdTask);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Task task, Guid id)
    {
        ValidationResult result = _validator.Validate(task);
        if (!result.IsValid)
        {
            return ErrorResponse.BadRequest(result.ToDictionary());
        }

        Task? updatedTask = await _taskService.UpdateTaskAsync(id, task);

        if (updatedTask == null) return ErrorResponse.NotFound(id);

        if (updatedTask.Priority == EPriority.High)
        {
            _logger.LogCritical($"A task with high priority was updated. Task ID: {updatedTask.Id}");
        }

        return Ok(updatedTask);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        Task? deletedTask = await _taskService.DeleteTaskAsync(id);

        if (deletedTask == null) return ErrorResponse.NotFound(id);

        return Ok();
    }
}
