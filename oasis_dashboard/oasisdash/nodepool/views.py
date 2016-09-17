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

from oasis_dashboard.oasisdash.nodepool import forms as nodepool_forms
from oasis_dashboard.api import oasis


class IndexView(forms.ModalFormView):
    template_name = "oasisdash/nodepool/index.html"
    form_class = nodepool_forms.NodePoolForm
    form_id = "node_pool_form"
    modal_header = _("Define NodePool")
    submit_url = reverse_lazy("horizon:oasisdash:nodepool:index")

    success_url = reverse_lazy("horizon:oasisdash:nodepool:index")
    page_title = _("Define NodePool")

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        # args = (self.kwargs['router_id'],)
        # context["router_id"] = self.kwargs['router_id']
        # context['submit_url'] = reverse(self.submit_url, args=args)
        return context

    def _get_nodepool(self, *ag, **kwargs):
        try:
            return oasis.node_pool_get(self.request)
        except Exception:
            msg = _('Unable to retrieve nodepool details.')
            exceptions.handle(self.request, msg)

    def get_initial(self):
        nodepool = self._get_nodepool()
        # initial = {
        #     'total_vm': policy['total_vm_count'],
        #     'vm_per_user': policy['vm_count_per_user']
        # }
        initial = {
            'scaledown_threshold': "100",
            'scaledown_evaluation_periods': "100",
            'scaledown_scale_period': "20",
            'scalueup_threshold': "30",
            'scaleup_evaluation_periods ': "40",
            'scaleup_period': "50",
            'scaledown_cooldown': "100",
            'scaleup_cooldown': "150",
            'scaledown_adjust': "10",
            'scaleup_adjust': "20",
            'max_size': "50",
            'min_size': "60"
        }
        return initial
