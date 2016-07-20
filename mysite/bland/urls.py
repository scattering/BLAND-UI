from django.conf.urls import url
from . import views

app_name = 'bland'
urlpatterns = [
    # /bland/
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^calc/$', views.calc, name='calc'),
    url(r'^fitting/$', views.fitting, name='fitting'),
    url(r'^upload/$', views.upload, name='upload'),
    url(r'^data/$', views.data, name='data'),
    url(r'^stat/$', views.stat, name='stat'),
    url(r'^files/$', views.files, name='files'),
    url(r'^cell/$', views.IndexView.as_view(), name='index'),
    url(r'^grid/$', views.IndexView.as_view(), name='index'),
    url(r'^instrument/$', views.IndexView.as_view(), name='index'),
    url(r'^results/$', views.IndexView.as_view(), name='index'),
    url(r'^models/$', views.IndexView.as_view(), name='index'),
    url(r'^fit/$', views.IndexView.as_view(), name='fit'),
    url(r'^status/(?P<token>.+)/$', views.status, name='status')
    ]
