using TaskManagementSystem.Domain.Abstractions.Repositories;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Persistence;
using Task = TaskManagementSystem.Domain.Models.Task;

namespace TaskManagementSystem.Dal.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly DataContext _context;

    public TaskRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<Task> CreateTaskAsync(Task task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return task;
    }

    public async Task<Task?> DeleteTaskAsync(Guid id)
    {
        Task? task = await _context.Tasks.FindAsync(id);

        if (task == null) return null;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return task;
    }

    public async Task<Task?> GetTaskAsync(Guid id)
    {
        var task = await _context.Tasks.SingleOrDefaultAsync(x => x.Id == id);

        if(task == null) return null;

        return task;
    }

    public async Task<List<Task>> GetTasksAsync()
    {
        var tasks = await _context.Tasks.ToListAsync();
        
        return tasks;
    }

    public async Task<Task?> UpdateTaskAsync(Guid id, Task updatedTask)
    {
        var task = await _context.Tasks.SingleOrDefaultAsync(x => x.Id == id);

        if (task == null) return null;

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Status = updatedTask.Status;
        task.DueDate = updatedTask.DueDate;
        task.Priority = updatedTask.Priority;

        await _context.SaveChangesAsync();

        return task;
    }
}
