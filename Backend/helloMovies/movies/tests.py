from django.test import TestCase
from django.urls import reverse
from .models import Movie


class MovieSearchViewTest(TestCase):
    def setUp(self):
        self.movie1 = Movie.objects.create(
            title="Movie 1",
            image="movie1.jpg",
            director="Director 1",
            genres="Action, Drama",
            duration=120,
            score=8.5,
            rating="PG-13",
            overview="This is Movie 1.",
            year=2020,
            actors="Actor 1, Actor 2",
        )

        self.movie2 = Movie.objects.create(
            title="Movie 2",
            image="movie2.jpg",
            director="Director 2",
            genres="Comedy, Romance",
            duration=105,
            score=7.8,
            rating="R",
            overview="This is Movie 2.",
            year=2019,
            actors="Actor 3, Actor 4",
        )

    def test_search_view_with_existing_movies(self):
        # Test the search view with a search term that matches one movie
        response = self.client.get(reverse('search-movies'), {'q': 'Movie 1'})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['total_movies'], 1)
        self.assertEqual(data['results'][0]['title'], 'Movie 1')

    def test_search_view_with_nonexistent_movies(self):
        # Test the search view with a search term that does not match any movies
        response = self.client.get(
            reverse('search-movies'), {'q': 'Nonexistent Movie'})
        self.assertEqual(response.status_code, 404)
        data = response.json()
        self.assertEqual(
            data['error'], 'No movies found for the given search term')

    def test_details_view_with_existing_movie(self):
        # Test the details view with an existing movie ID
        response = self.client.get(
            reverse('movie-detail', args=[self.movie1.id]))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['title'], 'Movie 1')

    def test_details_view_with_nonexistent_movie(self):
        # Test the details view with a nonexistent movie ID
        response = self.client.get(
            reverse('movie-detail', args=[999]))  # Nonexistent ID
        self.assertEqual(response.status_code, 404)
        data = response.json()
        self.assertEqual(data['error'], 'Movie not found')
