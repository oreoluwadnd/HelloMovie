

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.core import serializers
from django.core.paginator import Paginator
import json
from .models import Movie

# @csrf_exempt


def search(request):
    page = request.GET.get('page', 1)
    content_per_page = request.GET.get('content_per_page', 10)
    search_term = request.GET.get('q', '')
    print(search_term)
    print(page)
    movies = Movie.objects.filter(
        title__icontains=search_term).order_by('title')

    if not movies.exists():
        return JsonResponse({'error': 'No movies found for the given search term'}, status=404)

    paginator = Paginator(movies, content_per_page)
    total_movies = paginator.count
    try:
        current_page = paginator.page(page)
    except:
        return JsonResponse({'error': 'Page not found'}, status=404)

    movie_data = [{'title': movie.title,
                   'image': movie.image,
                   'genres': movie.genres,
                   'duration': movie.duration,
                   'score': movie.score,
                   'rating': movie.rating,
                   'overview': movie.overview,
                   'year': movie.year,
                   'id': movie.id,
                   } for movie in current_page]

    response_data = {
        'total_movies': total_movies,
        'page': page,
        'content_per_page': content_per_page,
        'results': movie_data,
    }

    return JsonResponse(response_data)


@csrf_exempt
def details(request, movie_id):
    try:
        movie = Movie.objects.get(pk=movie_id)

        movie_data = {
            'title': movie.title,
            'image': movie.image,
            'director': movie.director,
            'genres': movie.genres,
            'duration': movie.duration,
            'score': movie.score,
            'rating': movie.rating,
            'overview': movie.overview,
            'year': movie.year,
            'actors': movie.actors,
        }
        return JsonResponse(movie_data)
    except Movie.DoesNotExist:
        return JsonResponse({'error': 'Movie not found'}, status=404)


@csrf_exempt
def add_movie(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from the request's body
            data = json.loads(request.body)
            instances = [Movie(
                title=movie['title'],
                image=movie['image'],
                director=movie['director'],
                genres=movie['genres'],
                duration=movie['duration'],
                score=movie['score'],
                rating=movie['rating'],
                overview=movie['overview'],
                year=movie['year'],
                actors=movie['actors'],
            ) for movie in data]

            # Bulk insert the instances into the database
            Movie.objects.bulk_create(instances)
            print(instances)

            return JsonResponse({'message': 'Data inserted successfully'})
        except Exception as e:
            print(Exception)
            return JsonResponse({'error': str(e)})

    else:
        return JsonResponse({'error': 'Invalid request method. Use POST.'})
