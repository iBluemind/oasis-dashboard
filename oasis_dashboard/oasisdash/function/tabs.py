
from horizon import tabs
from django.utils.translation import ugettext_lazy as _
from oasis_dashboard.oasisdash.function import forms as function_forms
from horizon import forms
from oasis_dashboard.oasisdash.function import tables as function_table
from horizon import exceptions

from oasis_dashboard.api import oasis
import logging

LOG = logging.getLogger(__name__)


class DevelopTab(tabs.Tab):
    name = _("Develop")
    slug = "develop"
    template_name = 'oasisdash/function/develop.html'

    def get_context_data(self, request):
        return ' '


class IntegrationTab(tabs.TableTab):
    name = _("Integration")
    slug = "integration"
    table_classes = (function_table.FunctionTable,)
    # template_name = 'oasisdash/function/integration.html'
    template_name = "oasisdash/function/integration.html"
    preload = True

    def get_functions_data(self):
        try:
            LOG.debug('#################get_functions_data  call#################')
            # functions = oasis.function_list(self.tab_group.request)
            functions = [
                {
                    "id":"1",
                    "function_name": "sum",
                    "user_name": "admin",
                    "project_id": "1234"
                },
                {
                    "id":"2",
                    "function_name": "minus",
                    "user_name": "admin",
                    "project_id": "1234"
                }
            ]
            return functions
        except Exception:
            error_message = _('Unable to get functions')
            exceptions.handle(self.request, error_message)

            return []


    # def has_more_data(self, table):
    #     return self._has_more
    #
    # def get_context_data(self, request):
    #     return ''
    #     self.tab_group.kwargs['functions']
    # def get_integration_data(self):
    #     try:
    #         services = []
    #         # services = cinder.service_list(self.tab_group.request)
    #     except Exception:
    #         msg = _('Unable to get cinder services list.')
    #         exceptions.check_message(["Connection", "refused"], msg)
    #         exceptions.handle(self.request, msg)
    #         services = []
    #     return services
    #     # return self.tab_group.kwargs['functions']

    # def get_functions_data(self):
    #     try:
    #         instances, self._has_more = api.nova.server_list(
    #             self.request)
    #
    #         return instances
    #     except Exception:
    #         self._has_more = False
    #         error_message = _('Unable to get instances')
    #         exceptions.handle(self.request, error_message)
    #
    #         return []



class MonitorTab(tabs.Tab):
    name = _("Monitor")
    slug = "monitor"
    template_name = 'oasisdash/function/monitor.html'

    def get_context_data(self, request):
        return ' '

class FunctionTabs(tabs.TabGroup):
    slug = "function_tabs"
    tabs = (IntegrationTab, MonitorTab, )
