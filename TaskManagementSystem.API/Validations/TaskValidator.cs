using FluentValidation;
using Task = TaskManagementSystem.Domain.Models.Task;

namespace TaskManagementSystem.API.Validations;

public sealed class TaskValidator : AbstractValidator<Task>
{
    public TaskValidator()
    {
        RuleFor(x => x.Id)
            .NotNull()
            .NotEmpty()
            .WithMessage("Id is required");

        RuleFor(x => x.Title)
            .NotNull()
            .NotEmpty()
            .WithMessage("Title is required");

        RuleFor(x => x.Status)
            .NotNull()
            .NotEmpty()
            .WithMessage("Status is required");

        RuleFor(x => x.Priority)
            .NotNull()
            .NotEmpty()
            .WithMessage("Priority is required");

        RuleFor(x => x.DueDate)
            .NotNull()
            .NotEmpty()
            .WithMessage("Duedate is required");
    }
}
