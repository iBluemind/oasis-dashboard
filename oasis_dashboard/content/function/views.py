__author__ = 'kjwook'

from horizon import views

class IndexView(views.APIView):
    template_name = 'content/policy/index.html'