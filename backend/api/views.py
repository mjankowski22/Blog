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
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .validation_token import account_activation_token
from django.shortcuts import redirect
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from django.utils.text import slugify
from django.db.models import Q

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
    
class SearchPost(APIView):
    def get(self,request):
        search = request.GET['search']
        isLogged = request.GET['isLogged']
        user = None
        posts = Post.objects.filter(
            Q(title__icontains=search) | Q(content__icontains=search)
        )
        if(isLogged == 'true'):
            access_token = AccessToken(request.META['HTTP_AUTHORIZATION'][4:])
            user = User.objects.get(id=access_token['user_id'])
            posts= posts.filter(author=user)
        serializer = PostSerializer(posts,many=True)        
        return response.Response(serializer.data,status=200)
    
    

# class SearchPost(generics.ListAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['title','content']

class UpdatePost(APIView):
    def post(self,request):
        post_id = request.data['id']
        post_title = request.data['title']
        post_content =request.data['content']
        post = Post.objects.get(id=post_id)
        post.title = post_title
        post.content = post_content
        post.slug = slugify(post_title)
        post.save()
        return response.Response({'slug':post.slug},status=200)
    
class DeletePost(APIView):
    def post(self,request):
        post_id = request.data['id']
        post = Post.objects.get(id=post_id)
        post.delete()
        return response.Response("Deleted",status=200)


class CreateUser(APIView):

    def post(self,request):
        username = request.data['username']
        email = request.data['email']
        
        if User.objects.filter(username=username).exists():
            return(response.Response({"text":"This username already exists."},status=302))
        elif User.objects.filter(email=email).exists():
            return(response.Response({"text":"This email is taken."},status=302))
        else:
            serialized = UserSerializer(data=request.data)
            if serialized.is_valid():
                user = serialized.save()
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
        except(TypeError,ValueError,OverflowError,User.DoesNotExist) as error:
            user = None
        if user is not None and account_activation_token.check_token(user,token):
            user.is_active = True
            user.save()
            return redirect('http://localhost:3000')
        else:
            return response.Response("NOT OK",status=400)      


        
class GetUserData(APIView):
    authentication_classes = [JWTTokenUserAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        access_token = AccessToken(request.META['HTTP_AUTHORIZATION'][4:])
        
        user = User.objects.get(id=access_token['user_id'])
        user_data = {}
        posts = PostSerializer(user.posts.all(),many=True)
        user_data = {
            'username':user.username,
            'email':user.email,
            'posts':posts.data
        }
        return response.Response(user_data,status=200)
    

class AddPost(APIView):
    authentication_classes = [JWTTokenUserAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        user = User.objects.get(username=request.data['username'])
        post = Post.objects.create(title=request.data['title'],content=request.data['content'],author=user)
        post.slug = slugify(post.title)
        post.save()
        return response.Response("Created",status=201)
    

class CheckAuthor(APIView):
    authentication_classes = [JWTTokenUserAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        post_slug= request.data['slug']
        access_token = AccessToken(request.META['HTTP_AUTHORIZATION'][4:])
        if Post.objects.get(slug=post_slug).author.id == access_token['user_id']:
            return response.Response({"isAuthor":True},status=200)
        else:
            return response.Response({"isAuthor":False},status=200)