from django.conf.urls import url
from . import views

app_name = 'bland'
urlpatterns = [
    # /bland/
    url(r'^$', views.IndexView.as_view(), name='index'),
    # /bland/5/
    url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
    # /bland/5/results/
    url(r'^(?P<pk>[0-9]+)/results/$', views.ResultsView.as_view(), name='results'),
    # /bland/5/vote/
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
    url(r'^calc/$', views.calc, name='calc'),
    url(r'^upload/$', views.upload, name='upload'),
    url(r'^data/$', views.data, name='data'),
    url(r'^cell/$', views.IndexView.as_view(), name='index'),
    url(r'^grid/$', views.IndexView.as_view(), name='index'),
    url(r'^instrument/$', views.IndexView.as_view(), name='index')
    ]
