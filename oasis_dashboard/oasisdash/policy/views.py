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
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import forms
from horizon import tables
from horizon import tabs
from horizon.utils import memoized

from oasis_dashboard.oasisdash.policy import forms as policy_forms

# class IndexView(views.APIView):
#     # A very simple class-based view...
#     template_name = 'oasisdash/oasispolicy/index.html'
#
#     def get_data(self, request, context, *args, **kwargs):
#         # Add data to the context here...
#         return context

from oasis_dashboard.api import oasis

class IndexView(forms.ModalFormView):
    form_class = policy_forms.CreatePolicyForm
    form_id = "create_policy_form"
    modal_header = _("Define VM Policy")
    submit_label = _("Adjust")
    submit_url = "horizon:oasis:policy:index"
    template_name = 'oasisdash/oasispolicy/index.html'
    success_url = reverse_lazy("horizon:oasis:policy:index")
    page_title = _("Define VM Policy")

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        # args = (self.kwargs['router_id'],)
        # context["router_id"] = self.kwargs['router_id']
        # context['submit_url'] = reverse(self.submit_url, args=args)
        return context

    def get_policy(self, *ag, **kwargs):
        try:
            return oasis.policy_get(self.request)
        except Exception:
            msg = _('Unable to retrieve router details.')
            exceptions.handle(self.request, msg)

    def get_initial(self):
        policy = self._get_policy()
        initial = {
            'total_vm': policy['total_vm_count'],
            'vm_per_user': policy['vm_count_per_user']
        }
        return initial
