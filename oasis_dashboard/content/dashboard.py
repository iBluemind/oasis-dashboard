
from django.utils.translation import ugettext_lazy as _

import horizon


# class OasisGroup(horizon.PanelGroup):
#     slug = "oasis_group"
#     name = _("Oasis")
#     panels = ('function',)
#
#

class FunctionPanels(horizon.PanelGroup):
    slug = "function_group"
    name = _("Function")
    panels = ("function")

class Oasis(horizon.Dashboard) :
    name =_("Oasis")
    slug = "oasis"
    panels = ('FunctionPanels')
    default_panel = 'function'

horizon.register(Oasis)
