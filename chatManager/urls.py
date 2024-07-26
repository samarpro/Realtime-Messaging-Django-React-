from django.urls import path
from . import views

urlpatterns = [
    path("", views.ListFriends.as_view()),
    path("createGroup/", views.CreateGroup.as_view(), name="createGroup"),
    path("updateGroup/<int:pk>/", views.UpdateGroup.as_view(), name="updateGroup"),
    # path('updateGroup/',views._ListGroups.as_view(),name="updateGroup"),
    path("<str:group_name>/", views.ListMessages.as_view(), name="individual-chats"),
]
