from django.shortcuts import render
from blog.models import Post
from rest_framework import generics
from .serializer import PostSerializer
from rest_framework import filters


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class SinglePost(generics.RetrieveAPIView):
    queryset = Post.objects.all() 
    serializer_class = PostSerializer

    def get_object(self):
        slug = self.kwargs.get('slug')
        obj = Post.objects.get(slug=slug)
        return obj
    
class SearchPost(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title','content']
