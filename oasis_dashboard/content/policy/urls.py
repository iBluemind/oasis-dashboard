__author__ = 'kjwook'

from django.conf.urls import url

from oasis_dashboard.content.policy import views


urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index')
]
