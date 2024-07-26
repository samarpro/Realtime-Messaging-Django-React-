from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from chatManager.models import UserCreatedGroups


# Here what I could do is, add receiver and sender user instance in scope
# but the problem is how can we make this more safer.
# The problem is since I am just taking email from url and using it to get user instance, anybody could
# access this url and pretend to be user
# To mitigate that what we can do is
# send token in url and then validate that
class UserAdderMiddleware(BaseMiddleware):
    """Middleware runs before the request reaches to url/rooting or consumer. Good for authentication and other purposes."""

    async def __call__(self, scope, receive, send):
        """Since middleware runs before rooting the kwargs are not populated in scope"""
        path = scope.get("path").split("/")
        self.isMultiGroup = False
        print("Path please", path)
        mutual_url = path[2]
        print("Mutual url ", mutual_url.__str__)
        token = path[3]
        # when sending messages into the group you only have group_name and token which is sender.
        # So, handling such situation
        try:
            self.receiver_name = mutual_url.split("-")[1]
        except IndexError as e:
            self.isMultiGroup = True
            self.receiver_name = mutual_url
        sender = await database_sync_to_async(get_user_model().objects.get)(
            auth_token=token
        )
        print(sender)
        if not self.isMultiGroup:
            print(mutual_url, "Mutual URL")
            receiver = await database_sync_to_async(get_user_model().objects.get)(
                email__contains=self.receiver_name
            )
        else:  # receiver is group itself when isMultiGroup True
            receiver = await database_sync_to_async(UserCreatedGroups.objects.get)(
                group_name=mutual_url
            )
        scope["sender"] = sender
        scope["token"] = token
        scope["receiver"] = receiver
        scope["isMultiGroup"] = self.isMultiGroup
        print(scope)

        return await super().__call__(scope, receive, send)
