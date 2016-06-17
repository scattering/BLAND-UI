import datetime

from django.db import models
from django.utils import timezone

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text

class Atom(models.Model):
    label = models.CharField(max_length=100)
    atom = models.CharField(max_length=20)
    valence = models.IntegerField()
    isotope = models.CharField(max_length=3)
    #wyckoff = models.CharField(max_length=20)
    x = models.DecimalField(decimal_places=2, max_digits=10)
    y = models.DecimalField(decimal_places=2, max_digits=10)
    z = models.DecimalField(decimal_places=2, max_digits=10)
    occupancy = models.DecimalField(decimal_places=2, max_digits=3)
    thermal = models.CharField(max_length=11)
    def __str__(self):
        return self.label