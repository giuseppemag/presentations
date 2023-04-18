using Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// Answer to Question 3
builder.Services.AddTransient<IRegistrationService, RegistrationService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStaticFiles();

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
