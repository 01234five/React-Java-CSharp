using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class QueHub : Hub
    {
        public async Task SendQue(string message)
        {
            Console.WriteLine("Que Add received, sending to others: " + message);
            await Clients.Others.SendAsync("ReceiveQue", message);
        }
    }
}
