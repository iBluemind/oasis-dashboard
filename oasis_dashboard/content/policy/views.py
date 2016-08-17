__author__ = 'kjwook'

from django.views import generic


class IndexView(generic.TemplateView):
    template_name = 'content/policy/index.html'