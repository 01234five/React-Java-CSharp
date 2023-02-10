using SignalRChat.Hubs;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();    //gives problems mobile?
app.UseStaticFiles();


app.UseCors("corsapp");
app.UseRouting();

//app.UseAuthorization();

app.MapRazorPages();



app.MapHub<ChatHub>("/chatHub");
app.MapHub<QueHub>("/queHub");
app.MapHub<ThumbnailHub>("/thumbnailHub");
app.MapHub<StreamHub>("/streamHub");

app.Run();
