from django.shortcuts import render
from blog.models import Post
from rest_framework import generics
from rest_framework.views import APIView
from .serializer import PostSerializer,UserSerializer
from rest_framework import filters
from django.contrib.auth.models import User
from rest_framework import response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .validation_token import account_activation_token
from rest_framework.decorators import api_view,renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer


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
            message = render_to_string('acc_active_email.html',{
                'user':user,
                'uid':urlsafe_base64_encode(str(user.id).encode()),
                'token':account_activation_token.make_token(user),
            })
            to_email=email
            try:
                send_mail(mail_subject,message,None,[to_email],fail_silently=False)
                return response.Response("OK", status=201)
            except:
                return response.Response({"text": "Error sending email."}, status=500)
            

class Activate(APIView):
    def get(self,request,uid,token):
        try:
            uid = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(id=uid)
        except(TypeError,ValueError,OverflowError,User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user,token):
            user.is_active = True
            user.save()
            return response.Response("OK",status=200)
        else:
            return response.Response("NOT OK",status=400)      


        
