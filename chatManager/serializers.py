from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse

# from authentication.models import Friends
# class FriendsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = get_user_model()
#         fields = ['freinds']


class ListFriendsSerializer(serializers.ModelSerializer):
    """
    Iterates over every user object in queryset and serializes it based on the
    fields defined
    """

    group_url = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ["email", "username", "group_url", "pk"]

    def _group_name_generator(self, email1, email2):
        email1 = email1.split("@")[0]
        email2 = email2.split("@")[0]
        if email2 > email1:
            return f"{email2}-{email1}"
        return f"{email1}-{email2}"

    def get_group_url(self, friend_obj):
        """The return of this function is group_url"""
        request = self.context["request"]
        group_name = self._group_name_generator(request.user.email, friend_obj.email)
        return group_name


class ListMessagesSerializer(serializers.ModelSerializer):
    # The token is of sender
    token = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    class Meta:
        model = models.Messages
        fields = ["text", "token", "members"]

    def get_token(self, obj):
        # obj-> messages model object
        return obj.sender.auth_token.key

    def get_members(self, obj):
        group_name = obj.group_name
        print("Group Name is: ", group_name)
        group = models.UserCreatedGroups.objects.filter(group_name=group_name)
        print("Group__________", group)
        if group.exists():
            print(group[0].members.all(), "----------")
            members = [member.pk for member in group[0].members.all()]
            return members
        else:
            return []


class CreateGroupSerializer(serializers.ModelSerializer):
    owner = serializers.CharField()

    class Meta:
        model = models.UserCreatedGroups
        fields = ["owner", "members", "group_name"]

    def to_internal_value(self, data):
        internal_value = super().to_internal_value(data)
        print(internal_value)
        token = data.get("owner")
        try:
            user = Token.objects.get(key=token).user
        except Token.DoesNotExist:
            raise serializers.ValidationError({"owner": "Invalid Token !"})
        print("Token from to_internal_value", token)
        internal_value["owner"] = user
        print(internal_value)
        return internal_value  # this value will be for further processes


class UpdateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCreatedGroups
        fields = ['members','group_name']



class ListGroupsSerializer(serializers.ModelSerializer):
    group_url = serializers.SerializerMethodField()

    class Meta:
        model = models.UserCreatedGroups
        fields = ["group_name", "group_url",'pk']

    def get_group_url(self, group_obj):
        return group_obj.group_name
