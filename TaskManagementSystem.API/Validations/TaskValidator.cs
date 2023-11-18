using FluentValidation;
using TaskManagementSystem.Domain.Enums;
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
            .Must((x, _) =>
            {
                bool exists = Enum.IsDefined(typeof(ETaskStatus), x.Status);
                return exists;
            })
            .WithMessage("Status does not fall under valid range");

        RuleFor(x => x.Priority)
            .NotNull()
            .NotEmpty()
            .Must((x, _) =>
            {
                bool exists = Enum.IsDefined(typeof(EPriority), x.Priority);
                return exists;
            })
            .WithMessage("Priority does not fall under valid range");

        RuleFor(x => x.DueDate)
            .NotNull()
            .NotEmpty()
            .WithMessage("Duedate is required");
    }
}
