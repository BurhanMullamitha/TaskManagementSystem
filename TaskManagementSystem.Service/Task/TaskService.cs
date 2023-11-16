using TaskManagementSystem.Domain.Abstractions.Repositories;
using TaskManagementSystem.Domain.Abstractions.Services;
using Task = TaskManagementSystem.Domain.Models.Task;

namespace TaskManagementSystem.Service;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepo;

    public TaskService(ITaskRepository taskRepo)
    {
        _taskRepo = taskRepo;
    }

    public async Task<Task> CreateTaskAsync(Task task)
    {
        return await _taskRepo.CreateTaskAsync(task);
    }

    public async Task<Task?> DeleteTaskAsync(Guid id)
    {
        return await _taskRepo.DeleteTaskAsync(id);
    }

    public async Task<Task> GetTaskAsync(Guid id)
    {
        return await _taskRepo.GetTaskAsync(id);
    }

    public async Task<List<Task>> GetTasksAsync()
    {
        return await _taskRepo.GetTasksAsync();
    }

    public async Task<Task?> UpdateTaskAsync(Guid id, Task task)
    {
        return await _taskRepo.UpdateTaskAsync(id, task);
    }
}
