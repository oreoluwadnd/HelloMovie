
from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=200, db_index=True)
    image = models.URLField()
    director = models.CharField(max_length=200)
    genres = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    score = models.DecimalField(max_digits=3, decimal_places=1)
    rating = models.CharField(max_length=10)
    overview = models.TextField()
    year = models.PositiveIntegerField()
    actors = models.CharField(max_length=300)

    class Meta:
        db_table = 'Movie'

    def __str__(self):
        return self.title
