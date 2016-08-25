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



class IndexView(forms.ModalFormView):
    form_class = policy_forms.CreatePolicyForm
    form_id = "create_policy_form"
    modal_header = _("Define VM Policy")
    submit_label = _("Adjust")
    # submit_url = reverse_lazy('horizon:project:images:images:create')
    template_name = 'oasisdash/oasispolicy/index.html'
    # context_object_name = 'image'
    # success_url = reverse_lazy("horizon:project:images:index")
    page_title = _("Define VM Policy")

    def get_initial(self):
        initial = {}
        for name in [
            'vms',
            'vm_per_user'
        ]:
            tmp = self.request.GET.get(name)
            if tmp:
                initial[name] = tmp
        return initial


