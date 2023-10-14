from django.urls import path
from .views import PostList,SinglePost,SearchPost

app_name = 'api'


urlpatterns = [
    path('',PostList.as_view(),name='post-list'),
    path('post/<str:slug>/',SinglePost.as_view(),name='post-single'),
    path('search/',SearchPost.as_view(),name='post-search')
]
