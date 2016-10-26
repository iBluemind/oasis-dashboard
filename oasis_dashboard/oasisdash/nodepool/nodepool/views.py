from horizon.utils import memoized
from horizon import forms
from oasis_dashboard.oasisdash.nodepool.nodepool import forms as policy_forms
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse
from horizon import exceptions
from horizon import views

from oasis_dashboard.api import oasis


class CreateView(forms.ModalFormView):
    form_class = policy_forms.CreateForm
    form_id = "create_nodepool_form"
    modal_header = _("Create NodePool")
    template_name = 'oasisdash/nodepool/nodepool/create.html'
    submit_url = reverse_lazy("horizon:oasisdash:nodepool:nodepool:create")
    success_url = reverse_lazy("horizon:oasisdash:nodepool:index")
    page_title = _("Create Node Pool")
    submit_label = _("Create Node Pool")


class UpdateView(forms.ModalFormView):
    form_class = policy_forms.UpdateForm
    form_id = "update_nodepool_form"
    modal_header = _("Update NodePool")
    template_name = 'oasisdash/nodepool/nodepool/create.html'
    submit_url = "horizon:oasisdash:nodepool:nodepool:update"
    success_url = reverse_lazy('horizon:oasisdash:nodepool:index')
    page_title = _("Update NodePool")
    submit_label = _("Update NodePool")

    def get_context_data(self, **kwargs):
        context = super(UpdateView, self).get_context_data(**kwargs)
        context['nodepool'] = self.get_object()
        args = (self.kwargs['nodepool_id'],)
        context['submit_url'] = reverse(self.submit_url, args=args)
        return context

    @memoized.memoized_method
    def get_object(self):
        try:
            return oasis.node_pool_get(self.request, self.kwargs['nodepool_id'])
        except Exception:
            redirect = reverse("horizon:oasisdash:nodepool:index")
            exceptions.handle(self.request,
                              _('Unable to retrieve nodepool information.'),
                              redirect=redirect)

    def get_initial(self):
        data = self.get_object()
        return {'nodepool_id': self.kwargs['nodepool_id'],
                'name': data.name,
                'policy': data.nodepool_policy_id}


class DetailView(views.HorizonTemplateView):
    template_name = 'oasisdash/nodepool/nodepool/detail.html'
    page_title = "{{ nodepool.name }}"

    def get_context_data(self, **kwargs):
        context = super(DetailView, self).get_context_data(**kwargs)
        nodepool = self.get_data()

        context["nodepool"] = nodepool

        return context

    @memoized.memoized_method
    def get_data(self):
        try:
            nodepool_id = self.kwargs['nodepool_id']
            nodepool = oasis.node_pool_get(self.request, nodepool_id)
        except Exception:
            redirect = self.get_redirect_url()
            exceptions.handle(self.request,
                              _('Unable to retrieve nodepool details.'),
                              redirect=redirect)
        return nodepool

    def get_redirect_url(self):
        return reverse('horizon:oasisdash:nodepool:index')
