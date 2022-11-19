from django.db import models


class Bird(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=2000)
    image = models.CharField(max_length=2000)
    audio = models.CharField(max_length=2000)

    def __str__(self):
        return self.name
