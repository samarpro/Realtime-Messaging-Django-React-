from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models
from rest_framework.reverse import reverse
# from authentication.models import Friends
# class FriendsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = get_user_model()
#         fields = ['freinds']


class ListFriendsSerializer(serializers.ModelSerializer):
    """
    Iterates over every uer object in queryset and serializes it based on the
    fields defined
    """
    group_url = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ["email", "username",'group_url']

    def _group_name_generator(self,email1,email2):
        email1 = email1.split("@")[0]
        email2 = email2.split("@")[0]
        if email2>email1:
            return f'{email2}-{email1}' 
        return f'{email1}-{email2}'
            

    def get_group_url(self,friend_obj):
        '''The return of this function is group_url'''
        request = self.context['request']
        group_name = self._group_name_generator(request.user.email,friend_obj.email)
        return group_name

class ListMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Messages
        fields = ['sender','receiver','text']

class CreateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCreatedGroups
        fields = ['owner','members','group_name']

class UpdateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCreatedGroups
        fields = ['members','group_name']

class ListGroupsSerializer(serializers.ModelSerializer):
    group_url = serializers.SerializerMethodField()
    class Meta:
        model = models.UserCreatedGroups
        fields = ['group_name','group_url']

    def get_group_url(self,group_obj):
        return group_obj.group_name