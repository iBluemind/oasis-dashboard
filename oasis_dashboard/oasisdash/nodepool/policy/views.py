
from horizon import forms
from oasis_dashboard.oasisdash.nodepool.policy import forms as policy_forms
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _
from horizon.utils import memoized
from horizon import exceptions
from horizon import views
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
    form_class = policy_forms.UpdateForm
    form_id = "update_nodepool_policy_form"
    modal_header = _("Update NodePool Policy")
    template_name = 'oasisdash/nodepool/policy/create.html'
    submit_url = "horizon:oasisdash:nodepool:policy:update"
    success_url = reverse_lazy('horizon:oasisdash:nodepool:index')
    page_title = _("Update Policy")
    submit_label = _("Update Policy")

    def get_context_data(self, **kwargs):
        context = super(UpdateView, self).get_context_data(**kwargs)
        context['policy'] = self.get_object()
        args = (self.kwargs['nodepool_policy_id'],)
        context['submit_url'] = reverse(self.submit_url, args=args)
        return context

    @memoized.memoized_method
    def get_object(self):
        try:
            return oasis.node_pool_policy_get(self.request, self.kwargs['nodepool_policy_id'])
        except Exception:
            redirect = reverse("horizon:oasisdash:nodepool:index")
            exceptions.handle(self.request,
                              _('Unable to retrieve policy information.'),
                              redirect=redirect)

    def get_initial(self):
        data = self.get_object()
        return {'policy_id': self.kwargs['nodepool_policy_id'],
                'name': data.name,
                'scaledown_threshold': data.scaledown_threshold,
                'scaledown_evaluation_periods': data.scaledown_evaluation_periods,
                'scaledown_period': data.scaledown_period,
                'scaleup_threshold': data.scaleup_threshold,
                'scaleup_evaluation_periods': data.scaleup_evaluation_periods,
                'scaleup_period': data.scaleup_period,
                'scaledown_cooldown': data.scaledown_cooldown,
                'scaleup_cooldown': data.scaleup_cooldown,
                'scaledown_adjust': data.scaledown_adjust,
                'scaleup_adjust': data.scaleup_adjust,
                'max_size': data.max_size,
                'min_size': data.min_size}


class DetailView(views.HorizonTemplateView):
    template_name = 'oasisdash/nodepool/policy/detail.html'
    page_title = "{{ policy.name }}"

    def get_context_data(self, **kwargs):
        context = super(DetailView, self).get_context_data(**kwargs)
        policy = self.get_data()

        context["policy"] = policy

        return context

    @memoized.memoized_method
    def get_data(self):
        try:
            policy_id = self.kwargs['nodepool_policy_id']
            policy = oasis.node_pool_policy_get(self.request, policy_id)
        except Exception:
            redirect = self.get_redirect_url()
            exceptions.handle(self.request,
                              _('Unable to retrieve policy details.'),
                              redirect=redirect)
        return policy

    def get_redirect_url(self):
        return reverse('horizon:oasisdash:nodepool:index')
