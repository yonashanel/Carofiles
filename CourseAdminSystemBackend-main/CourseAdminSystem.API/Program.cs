using CourseAdminSystem.API.Middleware;
using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add our services
builder.Services.AddScoped<MemberRepository, MemberRepository>();
builder.Services.AddScoped<InstructorRepository, InstructorRepository>();
builder.Services.AddScoped<BookingRepository, BookingRepository>();
builder.Services.AddScoped<WorkoutRepository, WorkoutRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
//app.UseHttpsRedirection();



//app.UseHeaderAuthenticationMiddleware(); 
app.UseBasicAuthenticationMiddleware(); 
app.UseAuthorization(); 

app.MapControllers();

app.Run();
