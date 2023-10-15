from django.shortcuts import render
from blog.models import Post
from rest_framework import generics
from .serializer import PostSerializer,UserSerializer
from rest_framework import filters
from django.contrib.auth.models import User
from rest_framework import response
from django.core.mail import EmailMessage


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


class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self,request,*args, **kwargs):
        username = request.data['username']
        email= request.data['email']
        password = request.data['password']
        if User.objects.filter(username=username).exists():
            return(response.Response({"text":"This username already exists."},status=302))
        elif User.objects.filter(email=email).exists():
            return(response.Response({"text":"This email is taken."},status=302))
        else:
            user = User.objects.create(username=username,email=email,password=password)
            user.is_active = False
            user.save()
            mail_subject = 'Activate your blog account'
            message = "<h1>Hello</h1>"
            to_email="michal.jankowski22@o2.pl"
            email = EmailMessage(mail_subject,message,to=[to_email])
            email.send()
            return(response.Response("OK",status=201))

        
