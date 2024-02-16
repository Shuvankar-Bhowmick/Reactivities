using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

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
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    // Retrieves an instance of the logger for the Program class.
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
