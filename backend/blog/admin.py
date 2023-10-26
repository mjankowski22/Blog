from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    
    list_display = ['title','slug','author','id']
    prepopulated_fields = {'slug': ['title']}
