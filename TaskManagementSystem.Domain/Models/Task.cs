using TaskManagementSystem.Domain.Enums;

namespace TaskManagementSystem.Domain.Models
{
    public class Task
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public EPriority Priority { get; set; }
        public DateTime DueDate { get; set; }
        public ETaskStatus Status { get; set; }
    }
}
