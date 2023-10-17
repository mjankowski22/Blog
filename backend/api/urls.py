from django.urls import path
from .views import PostList,SinglePost,SearchPost,CreateUser,Activate,GetUserData,AddPost,UpdatePost,DeletePost,CheckAuthor
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView


app_name = 'api'


urlpatterns = [
    path('',PostList.as_view(),name='post-list'),
    path('post/<str:slug>/',SinglePost.as_view(),name='post-single'),
    path('search/',SearchPost.as_view(),name='post-search'),
    path('register/',CreateUser.as_view(),name="create-user"),
    path('activate/<str:uid>/<str:token>/',Activate.as_view(),name="activate"),
    path('token/',TokenObtainPairView.as_view(),name='token-obtain'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token-refresh'),
    path('user/',GetUserData.as_view(),name='get-user'),
    path('add/',AddPost.as_view(),name='add-post'),
    path('update/',UpdatePost.as_view(),name='update-post'),
    path('delete/',DeletePost.as_view(),name='delete-post'),
    path('check-author/',CheckAuthor.as_view(),name="check-author")
]
