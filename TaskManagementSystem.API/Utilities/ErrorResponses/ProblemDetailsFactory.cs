using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace TaskManagementSystem.API.Utilities.ErrorResponses;

public static class ProblemDetailsFactory
{
    public static ProblemDetails InternalServerError(Guid traceId)
    {
        var problem = new ProblemDetails()
        {
            Status = (int)HttpStatusCode.InternalServerError,
            Type = "Server error",
            Title = "Server error",
            Detail = "An internal server error has occured"
        };
        problem.Extensions.Add("trace_id", traceId.ToString());

        return problem;
    }

    public static ProblemDetails BadRequest(ActionContext context)
    {
        List<string> validationErrors = new List<string>();

        foreach (var error in context.ModelState.AsEnumerable())
        {
            foreach (var inner in error.Value!.Errors)
            {
                validationErrors.Add(inner.ErrorMessage);
            }
        }

        var problem = new ProblemDetails()
        {
            Status = (int)HttpStatusCode.BadRequest,
            Type = "Bad Request",
            Title = "Bad Request",
            Detail = "Validation(s) failed for request",
        };
        problem.Extensions.Add("errors", validationErrors);

        return problem;
    }

    public static ProblemDetails BadRequest(IDictionary<string, string[]> validationErrors)
    {
        var problem = new ProblemDetails()
        {
            Status = (int)HttpStatusCode.BadRequest,
            Type = "Bad Request",
            Title = "Bad Request",
            Detail = "Validation(s) failed for request",
        };
        problem.Extensions.Add("errors", validationErrors);

        return problem;
    }

    public static ProblemDetails NotFound(Guid id)
    {
        var problem = new ProblemDetails()
        {
            Status = (int)HttpStatusCode.NotFound,
            Type = "Not Found",
            Title = "Item not found",
            Detail = $"Item with ID: {id} could not be found"
        };

        return problem;
    }
}
