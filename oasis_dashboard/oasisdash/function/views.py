# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

from horizon import tabs

from oasis_dashboard.oasisdash.function import tabs as function_tabs
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _
from oasis_dashboard.api import oasis

from horizon import exceptions

class IndexView(tabs.TabbedTableView):
    # A very simple class-based view...
    tab_group_class = function_tabs.FunctionTabs
    page_title = _("Functions")
    template_name = 'oasisdash/function/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context

    # def _get_functions(self):
    #
    #     try:
    #         functions = oasis.function_list(self.request)
    #     except Exception:
    #         functions = []
    #         exceptions.handle(self.request, _('Unable to retrieve function list'))
    #
    #     return functions
    #
    # def get_data(self, request, context, *args, **kwargs):
    #     return self._get_functions()

    def get_tabs(self, request, *args, **kwargs):
        # functions = self._get_functions()
        # return self.tab_group_class(request, functions=functions, **kwargs)
        return self.tab_group_class(request, **kwargs)