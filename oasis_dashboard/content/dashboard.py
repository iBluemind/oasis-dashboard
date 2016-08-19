__author__ = 'kjwook'

from django.utils.translation import ugettext_lazy as _

import horizon

class Oasis(horizon.Dashboard) :
    name =_("Oasis")
    slug = "oasis"
    panels = ('policy')
    default_panel = 'policy'

horizon.register(Oasis)
