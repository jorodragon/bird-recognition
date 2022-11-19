from rest_framework import serializers

from bird.models import Bird


class BirdSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bird
        fields = ('name', 'description', 'image', 'audio')
