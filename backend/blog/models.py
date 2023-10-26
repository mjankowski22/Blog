from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver



def upload_location(instance,filename):
    return 'posts/{0}/{1}'.format(instance.id,filename)

class Post(models.Model):

    class Meta:
        ordering = ['-date']

    title = models.CharField(max_length=100,unique=True)
    content = models.TextField(max_length=1000)
    slug = models.SlugField()
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='posts')
    date = models.DateTimeField(auto_now=True)
    image = models.ImageField(null=True,blank=True,upload_to=upload_location)

    

    def __str__(self):
        return self.title


    
    

