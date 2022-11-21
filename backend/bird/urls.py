from django.urls import path

from . import views

urlpatterns = [
    path('predict', views.BirdPrediction.as_view()),
]
