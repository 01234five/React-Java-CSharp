using Microsoft.AspNetCore.SignalR;
namespace SignalRChat.Hubs
{
    public class ThumbnailHub : Hub 
    {

        public async Task SendThumbnail(string message)
        {
            Console.WriteLine(message);
            await Clients.Others.SendAsync("ReceiveThumbnail", message);
        }
    }
}
