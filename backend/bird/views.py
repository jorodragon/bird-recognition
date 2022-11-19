from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from bird.models import Bird
from bird.serializers import BirdSerializer


class ListCreateBirdView(ListCreateAPIView):
    model = Bird
    serializer_class = BirdSerializer

    def get_queryset(self):
        return Bird.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = BirdSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Create a new bird successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new bird unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)


class UpdateDeleteBirdView(RetrieveUpdateDestroyAPIView):
    model = Bird
    serializer_class = BirdSerializer

    def put(self, request, *args, **kwargs):
        bird = get_object_or_404(Bird, id=kwargs.get('pk'))
        serializer = BirdSerializer(bird, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Update bird successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update bird unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        bird = get_object_or_404(Bird, id=kwargs.get('pk'))
        bird.delete()

        return JsonResponse({
            'message': 'Delete bird successful!'
        }, status=status.HTTP_200_OK)
