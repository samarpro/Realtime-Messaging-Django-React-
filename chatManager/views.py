from rest_framework import generics, views
from rest_framework.views import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from . import serializers
from django.db.models import Q
from django.contrib.auth import get_user_model
from . import models
from itertools import chain


# Create your views here.

class _ListGroups():
    serializer_class = serializers.ListGroupsSerializer
    def get(self,req):
        user = req.user
        groups_own = user.group_owner.all()
        groups_member_of= user.members.all()
        groups = chain(groups_own,groups_member_of)
        print(type(groups))
        serializer = self.serializer_class(instance=groups,many=True,context={
            'request':req
        })
        groups = serializer.data
        return groups


class ListFriends(generics.GenericAPIView):
    '''This API also returns the groups that the user is part of along with their friends'''
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.ListFriendsSerializer

    def get(self, req, *args, **kwargs):
        user = req.user
        friends = user.friends.all()
        print(user.group_owner.all())
        print(friends)
        # if its a queryset then pass that as instance not as data
        # if done instance = ... then is_valid is not availabe, with data=.. is
        # data has to be a list of datatype
        # but instance could be a instance as well and queryset as well
        serializer = self.serializer_class(instance=friends, many=True,context={
            'request':req
        })
        friends = serializer.data
        listGroup_obj = _ListGroups()
        resp = listGroup_obj.get(req)
        return Response(chain(resp,friends))



class ListMessages(generics.ListAPIView):
    serializer_class = serializers.ListMessagesSerializer
    def get_queryset(self):
        '''
        Basically directly providing access to list of message, given the mutual url
        '''
        # This is get_queryset method therefore it hasn't got direct access to req because it is ran by other python code
        group_name = self.request.parser_context['kwargs']['group_name']
        # filtering the object with group_name
        _queryset = models.Messages.objects.filter(
            group_name = group_name
        )
        print(_queryset)
        return _queryset
    

class CreateGroup(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CreateGroupSerializer



class UpdateGroup(generics.UpdateAPIView):
    serializer_class = serializers.UpdateGroupSerializer
    permission_classes = [IsAuthenticated] # Isowner

    
