using Microsoft.AspNetCore.SignalR;
namespace SignalRChat.Hubs
{
    public class StreamHub : Hub
    {
        public async Task SendStreamNotification(string message)
        {
            Console.WriteLine("Stream Notificaiton: " + message);
            await Clients.Others.SendAsync("ReceiveStreamNotification", message);
        }
    }
}
