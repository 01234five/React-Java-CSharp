# React-Java-CSharp

React-
Screens:
Main
![0](https://user-images.githubusercontent.com/83076267/219884985-2d82fd08-e2c8-4c4e-910e-2e604b75cfa3.png)
Chat
![1](https://user-images.githubusercontent.com/83076267/219884940-c99b27a8-6db6-4dde-9039-8842fca12406.png)
Que-1
![2](https://user-images.githubusercontent.com/83076267/219885015-20e4c31e-55db-434f-8fcd-5cb8ee9847c6.png)
Que-2
![3](https://user-images.githubusercontent.com/83076267/219885016-6aec8c3f-7097-4fbf-b98d-d6a76ca57590.png)
Settings
![4](https://user-images.githubusercontent.com/83076267/219885019-014ad092-8ac9-4ae0-afa6-5ac968e9c263.png)
Layout 2
![5](https://user-images.githubusercontent.com/83076267/219885025-ad1c776d-a6bc-4bfa-b6b4-1d7b49ee2eb8.png)

Interface created with react has 4 screens including the main one. Chat where you are able to send messages allowing communication with others visiting the site. The coomunication is done via signalr websockets. The website is using two signalr hubs. A chat hub for messages and a que hub for informing the user that a new video has been submitted to site and an update to the que needs to be done. Messages are saved to a mysql database on the server. This allow to fetch the last 20 messages as enforced by code. The last 20 messages are received when the website is visited via rest get request. Get/Post request are managed with springboot. The website uses a get request for reading messages and updating que list and post for uploading files. Viewing videos
