from django.urls import path

from . import views

urlpatterns = [
    path('search/', views.search, name='search-movies'),
    path("<int:movie_id>/", views.details, name="movie-detail"),
    path('add_movie/', views.add_movie, name='add_movie'),
]
