using Microsoft.AspNetCore.SignalR;
using System.Collections.Specialized;
using SignalRChat.Models;
using System.Text;
using System;
using Newtonsoft.Json;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        HttpClient httpClient = new HttpClient();




        public async Task SendMessage(string user, string user_color,string message)
        {
            var model_message = new ModelMessage();
            model_message.user = user; 
            model_message.user_color = user_color;
            model_message.message = message;


            var json = JsonConvert.SerializeObject(model_message);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            Console.WriteLine("Message received, sending to everyone"+user+" "+ message);
            await Clients.Others.SendAsync("ReceiveMessage", user, user_color, message);
            _ =httpClient.PostAsync("http://localhost:8080/addMessage?user=" + user + "&user_color=" + user_color + "&message=" + message, data);
        }

        public async Task SendQue(string message)
        {
            Console.WriteLine("Que Add received, sending to others: " + message);
            await Clients.Others.SendAsync("ReceiveQue", message);
        }
    }
}