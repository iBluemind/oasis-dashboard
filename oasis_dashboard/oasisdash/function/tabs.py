
from horizon import tabs
from django.utils.translation import ugettext_lazy as _
from oasis_dashboard.oasisdash.function import forms as function_forms
from horizon import forms
from oasis_dashboard.oasisdash.function import tables as function_table
from horizon import exceptions
from oasis_dashboard.oasisdash.function import forms as detail_forms
from oasis_dashboard.api import oasis
from horizon.utils import memoized

import logging

LOG = logging.getLogger(__name__)


class DevelopTab(tabs.Tab):
    name = _("Develop")
    slug = "develop"
    template_name = 'oasisdash/function/develop.html'

    def get_context_data(self, request):
        pass


class IntegrationTab(tabs.Tab):
    name = _("Integration")
    slug = "integration"
    template_name = "oasisdash/function/integration.html"

    # @memoized.memoized_method
    # def get_form(self, **kwargs):
    #     form_class = kwargs.get('form_class', self.get_form_class())
    #     return super(IntegrationTab, self).get_form(form_class)
    #
    # def get_initial(self):
    #     LOG.debug(self.kwargs)
    #     oasis.function_get(self.request, self.kwargs['function_id'])
    #     initial = {
    #         'function_name': 'sum',
    #         'method': 'post'
    #     }
    #     return initial

# class IntegrationTab(tabs.FormTab):
#     name = _("Integration")
#     slug = "integration"
#     # template_name = 'oasisdash/function/integration.html'
#     template_name = "oasisdash/function/integration.html"
#     form_classes = (detail_forms.DetailFunctionForm,)
#     preload = True
#     form_id = "detail_function_form"
#     modal_header = _("Function Detail")
#
#     def get_context_data(self, request):
#         pass
#
#     def get_initial(self):
#         LOG.debug(self.kwargs)
#         # oasis.function_get(self.request, self.kwargs['function_id'])
#         initial = {
#             'function_name': 'sum',
#             'method': 'post'
#         }
#         return initial


class MonitorTab(tabs.Tab):
    name = _("Monitor")
    slug = "monitor"
    template_name = 'oasisdash/function/monitor.html'

    def get_context_data(self, request):
        pass


class FunctionTabs(tabs.TabGroup):
    slug = "function_tabs"
    # tabs = (DevelopTab, IntegrationTab, MonitorTab, )
    tabs = (DevelopTab, IntegrationTab,MonitorTab, )