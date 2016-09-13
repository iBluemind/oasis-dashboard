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
from oasis_dashboard.api import oasis
from horizon import views

import logging

LOG = logging.getLogger(__name__)


from oasis_dashboard.oasisdash.function import tabs as function_tabs
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _
from oasis_dashboard.api import oasis
from oasis_dashboard.oasisdash.function import tables as function_table
from horizon import exceptions
from horizon import tables


class IndexView(tables.DataTableView):
    table_class = function_table.FunctionTable
    template_name = "oasisdash/function/index.html"
    page_title = _("Functions")

    # def get_context_data(self, **kwargs):
    #     context = super(IndexView, self).get_context_data(**kwargs)
    #     return context
    #
    # def get_functions_data(self):
    #     try:
    #         LOG.debug('#################get_functions_data  call#################')
    #         # functions = oasis.function_list(self.tab_group.request)
    #         functions = [
    #             {
    #                 "id": "1",
    #                 "function_name": "sum",
    #                 "user_name": "admin",
    #                 "project_id": "1234"
    #             },
    #             {
    #                 "id": "2",
    #                 "function_name": "minus",
    #                 "user_name": "admin",
    #                 "project_id": "1234"
    #             }
    #         ]
    #
    #         return functions
    #     except Exception:
    #         error_message = _('Unable to get functions')
    #         exceptions.handle(self.request, error_message)
    #
    #         return []

    def has_prev_data(self, table):
        return getattr(self, "_prev", False)

    def has_more_data(self, table):
        return getattr(self, "_more", False)

    def get_data(self):
        try:
            LOG.debug('#################get_functions_data  call#################')
            # functions = oasis.function_list(self.tab_group.request)
            functions = [
                {
                    "id": "1",
                    "function_name": "sum",
                    "user_name": "admin",
                    "project_id": "1234"
                },
                {
                    "id": "2",
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

# class IndexView2(tabs.TabbedTableView):
#     # A very simple class-based view...
#     tab_group_class = function_tabs.FunctionTabs
#     page_title = _("Functions")
#     template_name = 'oasisdash/function/index.html'
#
#     def get_context_data(self, **kwargs):
#         context = super(IndexView, self).get_context_data(**kwargs)
#         return context
#
#     # def _get_functions(self):
#     #
#     #     try:
#     #         functions = oasis.function_list(self.request)
#     #     except Exception:
#     #         functions = []
#     #         exceptions.handle(self.request, _('Unable to retrieve function list'))
#     #
#     #     return functions
#     #
#     # def get_data(self, request, context, *args, **kwargs):
#     #     return self._get_functions()
#
#     def get_tabs(self, request, *args, **kwargs):
#         # functions = self._get_functions()
#         # return self.tab_group_class(request, functions=functions, **kwargs)
#         return self.tab_group_class(request, **kwargs)


class DetailView(tabs.TabView):
    tab_group_class = function_tabs.FunctionTabs
    page_title = _("Functions")
    template_name = 'oasisdash/function/detail.html'
    # template_name = 'horizon/common/_detail.html'

    def get_tabs(self, request, *args, **kwargs):
        # functions = self._get_functions()
        # return self.tab_group_class(request, functions=functions, **kwargs)
        return self.tab_group_class(request, **kwargs)


# class DetailView(tabs.TabbedFormView):
#     tab_group_class = function_tabs.FunctionTabs
#     page_title = _("Functions")
#     template_name = 'oasisdash/function/detail.html'
    # template_name = 'horizon/common/_detail.html'

    # def get_tabs(self, request, *args, **kwargs):
    #     # functions = self._get_functions()
    #     # return self.tab_group_class(request, functions=functions, **kwargs)
    #     return self.tab_group_class(request, **kwargs)


# class DetailView2(forms.ModalFormView):
#     form_class = detail_forms.DetailFunctionForm
#     form_id = "detail_function_form"
#     modal_header = _("Function Detail")
#     submit_url = reverse_lazy("horizon:oasisdash:function:index")
#     template_name = 'oasisdash/function/detail_function.html'
#     success_url = reverse_lazy("horizon:oasisdash:function:index")
#     page_title = _("Function Detail")
#
#     def get_context_data(self, **kwargs):
#         context = super(DetailView, self).get_context_data(**kwargs)
#         # args = (self.kwargs['router_id'],)
#         # context["router_id"] = self.kwargs['router_id']
#         # context['submit_url'] = reverse(self.submit_url, args=args)
#         return context
#
#     def get_initial(self):
#         LOG.debug(self.kwargs)
#         oasis.function_get(self.request, self.kwargs['function_id'])
#         initial = {
#             'function_name': 'sum',
#             'method': 'post'
#         }
#         return initial


class CreateView(views.APIView):
    template_name = 'oasisdash/function/_create.html'
    page_title = _("Create Function")
