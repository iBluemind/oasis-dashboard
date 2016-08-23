__author__ = 'kjwook'

from django.utils.translation import ugettext_lazy as _
import horizon
from oasis_dashboard.content import dashboard

class Function(horizon.Panel) :
    name = _("Function")
    slug = 'function'

dashboard.Oasis.register(Function)
