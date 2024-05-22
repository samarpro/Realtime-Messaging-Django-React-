# How will the architecture of messaging app will work?
-> Basically, Listing friends and mesaages between any two user are handled by http request. Only the actual messaging part is handled by channels . For chat room (containing two users), name will be defined as "user1-user2". This is called as mutual url which will be sent along with message to the server to know which chat room this message belongs to. But the question is how do we now which user sends and which not.

For that maybe we can arrange the mutual url in a way that convey which user sent the message. Which means the mutual url format maybe different from what the channels\django knows as it won't be the same to that first created because at first another user might have messaged.
To solve this we might need to first take sender and receiver from url and then try to find group with different format. 


# What are Channels?
Channels are extension to django which makes handling multiple communication protocol easier. Which also refers we can handle websocket communication protocol.The concept of channels in context of websocket doesn't exists outside of django.

# What is Channel_layer?
Channel layer is a mechanism that allows multiple instances of application to talk together. In our case, we are using channel_layer to distribute messages from one instnace of application to another with storing it in a database.

# What are the Groups?
Channel layer has built-in mechanism for broadcasting which is group. So, groups sits on top of channel_layer. It can send message to multiple consumer which basically means multiple instance of application.

The channel layer in Django Channels has a built-in mechanism for broadcasting messages called groups. Groups sit on top of the channel layer and allow sending messages to multiple consumers simultaneously, meaning multiple instances of an application can receive the same message at the same time.

# What is channel(only)?
A channel in Django Channels refers to a logical communication path or queue that allows different parts of the application to send and receive messages. The channel_name is a unique identifier assigned to each consumer instance (e.g., WebSocket connection, HTTP request) that represents the specific channel it is listening on.

Consumer is a house to which only one roads goes. So anyone who needs to contact house has to go through that road. That road is channel and name of that road is channel_name. Channel is llke a mailbox where every outside info has to go through before getting into the house. 

