
from horizon import forms
from oasis_dashboard.oasisdash.nodepool.nodepool import forms as policy_forms
from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _


class CreateView(forms.ModalFormView):
    form_class = policy_forms.CreateForm
    form_id = "create_nodepool_policy_form"
    modal_header = _("Create NodePool Policy")
    template_name = 'oasisdash/nodepool/nodepool/create.html'
    submit_url = reverse_lazy("horizon:oasisdash:nodepool:nodepool:create")
    success_url = reverse_lazy("horizon:oasisdash:nodepool:index")
    page_title = _("Create Node Pool")
    submit_label = _("Create Node Pool")