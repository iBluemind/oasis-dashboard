__author__ = 'kjwook'

from django.utils.translation import ugettext_lazy as _

import horizon

class Oasis(horizon.dashboard) :
    name =_("Oasis")
    slug = "oasis"
    panels = ('admin')
    default_panel = 'admin'

horizon.register(Oasis)
