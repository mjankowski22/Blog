from rest_framework import serializers
from blog.models import Post
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)


    class Meta:
        model = Post 
        fields = ['id','title','content','date','author','slug','image']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.is_active =False
        instance.save()
        return instance