from django.db import models

class Document(models.Model):
    title = models.CharField(max_length = 200)
    images = models.ImageField(blank=True, upload_to="images/", null=True)
