from channels import consumer, exceptions
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
        print("Scope are", self.scope)
        if not self.scope["isMultiGroup"]:  # if the group is only of two people
            group_name = self.scope["url_route"]["kwargs"]["group_name"]
            # since scope already has the sender and receiver utilizing that.
            sender, receiver = group_name.split(
                "-"
            )  # we cannot take from scope because scope's sender and receiver are objects not name
        # changing coroutine into str
        self.GROUP_NAME = (
            self._format_group_name(sender, receiver)
            if not self.scope["isMultiGroup"]
            else self.scope["receiver"].group_name
        )
        # adding that channel layer to the group ie adding user to the group when user clicks on the grooup name
        # user won't get to see group_name if it is not part of the group, but possibility is there that if they know thegroup_name they can join, because there's no filtering mechanism for adding user into the group
        await self.channel_layer.group_add(self.GROUP_NAME, self.channel_name)
        await self.send({"type": "websocket.accept"})

    async def websocket_receive(self, e):
        """This function only accespts a message. Sender and receiver are automatically figured out."""
        message = json.loads(e["text"])["text"]
        msg_obj = await database_sync_to_async(Messages.objects.create)(
            sender=self.scope["sender"],
            receiver=self.scope["receiver"] if not self.scope["isMultiGroup"] else None,
            text=message,
            group_name=self.GROUP_NAME,
        )
        # group_send only sends message to the group or more specifically, it only sends message to channel of consumer. But the messages also has to be sent to the clients for UI updation or any task. So, When we do group_send we refer to another method that consumer instance has access to for sending it back to client.
        resp = {
            "text": message,
            "token": self.scope["token"],
        }
        print(resp)
        await self.channel_layer.group_send(
            self.GROUP_NAME,
            {
                "type": "websocket.send_client",
                "text": resp,
            },
        )
        print("Received Something ")

    async def websocket_send_client(self, event):
        print(event["text"])
        print("Sendig to client")
        await self.send({"type": "websocket.send", "text": json.dumps(event["text"])})

    # database_sync_to_async(msg_obj.save)()

    async def websocket_disconnect(self, e):
        print("Disconnected")
        await self.channel_layer.group_discard(self.GROUP_NAME, self.channel_name)
        await self.send({"type": "websocket.close"})
        raise exceptions.StopConsumer()
