
from horizon import forms
from oasis_dashboard.oasisdash.nodepool.policy import forms as policy_forms
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _
from horizon.utils import memoized
from horizon import exceptions

from oasis_dashboard.api import oasis


class CreateView(forms.ModalFormView):
    form_class = policy_forms.CreateForm
    form_id = "create_nodepool_policy_form"
    modal_header = _("Create NodePool Policy")
    template_name = 'oasisdash/nodepool/policy/create.html'
    submit_url = reverse_lazy("horizon:oasisdash:nodepool:policy:create")
    success_url = reverse_lazy('horizon:oasisdash:nodepool:index')
    page_title = _("Create Policy")
    submit_label = _("Create Policy")


class UpdateView(forms.ModalFormView):
    context_object_name = 'network'
    form_class = policy_forms.UpdateForm
    form_id = "update_network_form"
    modal_header = _("Edit Network")
    submit_label = _("Save Changes")
    submit_url = "horizon:project:networks:update"
    success_url = reverse_lazy("horizon:project:networks:index")
    template_name = 'project/networks/update.html'
    page_title = _("Update Network")

    def get_context_data(self, **kwargs):
        context = super(UpdateView, self).get_context_data(**kwargs)
        args = (self.kwargs['network_id'],)
        context["network_id"] = self.kwargs['network_id']
        context["submit_url"] = reverse(self.submit_url, args=args)
        return context

    @memoized.memoized_method
    def _get_object(self, *args, **kwargs):
        policy_id = self.kwargs['policy_id']
        try:
            return oasis.node_pool_get(self.request, policy_id)
        except Exception:
            redirect = self.success_url
            msg = _('Unable to retrieve policy.')
            exceptions.handle(self.request, msg, redirect=redirect)

    def get_initial(self):
        data = self._get_object()
        return {'policy_id': data['id'],
                'name': data['name'],
                'scaledown_threshold': data['scaledown_threshold'],
                'scaledown_evaluation_periods': data['scaledown_evaluation_periods'],
                'scaledown_period': data['scaledown_period'],
                'scaleup_threshold': data['scaleup_threshold'],
                'scaleup_evaluation_periods': data['scaleup_evaluation_periods'],
                'scaleup_period': data['scaleup_period'],
                'scaledown_cooldown': data['scaledown_cooldown'],
                'scaleup_cooldown': data['scaleup_cooldown'],
                'scaledown_adjust': data['scaledown_adjust'],
                'scaleup_adjust': data['scaleup_adjust'],
                'max_size': data['max_size'],
                'min_size': data['min_size']}