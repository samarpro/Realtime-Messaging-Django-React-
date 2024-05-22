from channels import consumer
import json
from chatManager.models import Messages
from channels.db import database_sync_to_async


class ChatConsumer(consumer.AsyncConsumer):
    def __init__(self):
        super().__init__()
        self.GROUP_NAME = None

    def _format_group_name(self, sender, receiver):
        if receiver > sender:
            return f"{receiver}-{sender}"
        return str(f"{sender}-{receiver}")

    async def websocket_connect(self, e):
        print("Connected")
        group_name = self.scope["url_route"]["kwargs"]["group_name"]
        sender, receiver = group_name.split("-")
        # changing coroutine into str
        self.GROUP_NAME = self._format_group_name(sender, receiver)
        await self.channel_layer.group_add(self.GROUP_NAME, self.channel_name)
        await self.send({"type": "websocket.accept"})

    async def websocket_receive(self, e):
        message = json.loads(e["text"])["text"]
        # msg_obj = await database_sync_to_async(Messages.objects.create)(
        #     sender=self.scope["sender"],
        #     receiver=self.scope["receiver"],
        #     text=message,
        #     group_name=self.GROUP_NAME,
        # )
        # group_send only sends message to the group or more specifically, it only sends message to channel of consumer. But the messages also has to be sent to the clients for UI updation or any task. So, When we do group_send we refer to another method that consumer instance has access to for sending it back to client.
        print(message)
        await self.channel_layer.group_send(
            self.GROUP_NAME,
            {
                "type": "websocket.SendClient",
                "message": message,
            },
        )
        print("Received Something ")


    async def websocket_SendClient(self, event):
        await self.send(
            {
                'type':'websocket.send',
                "message": event["message"],
            },
        )

    # database_sync_to_async(msg_obj.save)()

    async def websocket_disconnect(self, e):
        print("Disconnected")
        self.channel_layer.group_discard(self.GROUP_NAME,self.channel_name)
        # removes channel from channel layer
        self.channel_layer.flush()
        await self.close()
