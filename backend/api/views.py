from django.shortcuts import render
from blog.models import Post
from rest_framework import generics
from .serializer import PostSerializer


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
