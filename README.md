# React-Java-CSharp

Interface created with react has 4 screens including the main one. Chat where you are able to send messages allowing communication with others visiting the site. The coomunication is done via signalr websockets. The website is using two signalr hubs. A chat hub for messages and a que hub for informing the user that a new video has been submitted to site and an update to the que needs to be done. Messages are saved to a mysql database on the server. This allow to fetch the last 20 messages as enforced by code. The last 20 messages are received when the website is visited via rest get request. Get/Post request are managed with springboot. The website uses a get request for reading messages and updating que list and post for uploading files. A nginx server is created in a docker container that streams in rtmp and hls format. OBS is used for video streaming. OBS websockets are used to receive notification on the server for when a video ended, allowing the ability to keep going through the que of videos.

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

Java-Springboot

![7](https://user-images.githubusercontent.com/83076267/219888156-593ac256-a400-46af-a6b7-652af8d240b7.png)

C#-Signalr

![8](https://user-images.githubusercontent.com/83076267/219887754-b4070348-c520-4630-a262-7b9e12b60277.png)

Mysql workbench (mysql server is used)

![6](https://user-images.githubusercontent.com/83076267/219888377-3e2acfc8-4cc9-46e5-843a-75ce968053d6.png)

Docker (nginx server is here)
![9](https://user-images.githubusercontent.com/83076267/219888505-b6d78db1-f0d0-4318-84d3-4655d07a5522.png)


For viewing the website live go to http://47.202.156.160:3000/  
OBS might or might not be up as this not allow the server to lock and i sometimes just turn it off and lock the computer as this is not for business purposes.
