__author__ = 'kjwook'


from django.utils.translation import ugettext_lazy as _
import horizon
from oasis_dashboard.content import dashboard

class Policy(horizon.Panel) :
    name = _("Policy")
    slug = 'policy'

dashboard.Oasis.register(Policy)
