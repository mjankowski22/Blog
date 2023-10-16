from django.urls import path
from .views import PostList,SinglePost,SearchPost,CreateUser,Activate
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView


app_name = 'api'


urlpatterns = [
    path('',PostList.as_view(),name='post-list'),
    path('post/<str:slug>/',SinglePost.as_view(),name='post-single'),
    path('search/',SearchPost.as_view(),name='post-search'),
    path('register/',CreateUser.as_view(),name="create-user"),
    path('activate/<str:uid>/<str:token>/',Activate.as_view(),name="activate"),
    path('token/',TokenObtainPairView.as_view(),name='token-obtain'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token-refresh')
]
