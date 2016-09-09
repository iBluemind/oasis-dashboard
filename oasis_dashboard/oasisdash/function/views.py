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
from horizon import forms
from oasis_dashboard.oasisdash.function import forms as detail_forms
from oasis_dashboard.api import oasis
from horizon import views

import logging

LOG = logging.getLogger(__name__)


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


class DetailView(forms.ModalFormView):
    form_class = detail_forms.DetailFunctionForm
    form_id = "detail_function_form"
    modal_header = _("Function Detail")
    submit_url = reverse_lazy("horizon:oasisdash:function:index")
    template_name = 'oasisdash/function/detail_function.html'
    success_url = reverse_lazy("horizon:oasisdash:function:index")
    page_title = _("Function Detail")

    def get_context_data(self, **kwargs):
        context = super(DetailView, self).get_context_data(**kwargs)
        # args = (self.kwargs['router_id'],)
        # context["router_id"] = self.kwargs['router_id']
        # context['submit_url'] = reverse(self.submit_url, args=args)
        return context

    def get_initial(self):
        LOG.debug(self.kwargs)
        oasis.function_get(self.request, self.kwargs['function_id'])
        initial = {
            'function_name': 'sum',
            'method': 'post'
        }
        return initial


class CreateView(views.APIView):
    template_name = 'oasisdash/function/develop.html'
    page_title = _("Create Function")
