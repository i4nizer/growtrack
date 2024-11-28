from django.db import models

class LettuceImage(models.Model):
    image = models.ImageField(upload_to='lettuce_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

