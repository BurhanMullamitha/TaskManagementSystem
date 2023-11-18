using Task = TaskManagementSystem.Domain.Models.Task;

namespace TaskManagementSystem.Domain.Abstractions.Services;

public interface ITaskService
{
    Task<List<Task>> GetTasksAsync();
    Task<Task?> GetTaskAsync(Guid id);
    Task<Task> CreateTaskAsync(Task task);
    Task<Task?> UpdateTaskAsync(Guid id, Task task);
    Task<Task?> DeleteTaskAsync(Guid id);
}
