from django.urls import path

from . import views

urlpatterns = [
    path('birds', views.ListCreateBirdView.as_view()),
    path('birds/<int:pk>', views.UpdateDeleteBirdView.as_view()),
]
