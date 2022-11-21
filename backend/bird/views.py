from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from bird.models import Bird
from bird.serializers import BirdSerializer

from .core import (create_spectrogram, predict, create_result)
import os

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
model = os.path.join(THIS_DIR, 'model', 'efficientnet.h5')


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


ALLOWED_EXTENSIONS = {'wav'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class BirdPrediction(ListCreateAPIView):
    model = Bird
    serializer_class = BirdSerializer

    def create(self, request, *args, **kwargs):
        file = None
        file = request.FILES['file']

        if not file or file.name == '':
            return JsonResponse({
                'message': 'No selected file'
            }, status=status.HTTP_400_BAD_REQUEST)

        if file and allowed_file(file.name):
            image, fig = create_spectrogram(file)
            pred = predict(model, image)
            result = create_result(pred)
            print(result)
            if result['probability'] > 74:
                return JsonResponse({
                    'message': 'Success',
                    'bird': result['bird'],
                    'probability': result['probability'],
                }, status=status.HTTP_200_OK)
            else:
                return JsonResponse({
                    'message': 'Success',
                    'bird': 'Not a bird',
                }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Wrong file format'
        }, status=status.HTTP_400_BAD_REQUEST)
