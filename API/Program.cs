using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// Middleware

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

/* First authenticate if it a validate user, if yes then authorize it. First authentication and then authorization */
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// using: when we're done with the scope everything inside it will be cleaned and erased from memory.
using var scope = app.Services.CreateScope();

// retrieves the IServiceProvider from the created scope. The service provider is responsible for resolving and providing instances of registered services.
var services = scope.ServiceProvider;

try
{
    // Retrieved an instance of "DataContext" from the service provider.
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    // Retrieves an instance of the logger for the Program class.
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
