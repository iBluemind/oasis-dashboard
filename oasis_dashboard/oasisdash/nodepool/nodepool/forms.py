from django.utils.translation import ugettext_lazy as _
import logging

from horizon import exceptions
from horizon import forms
from horizon import messages

from oasis_dashboard.api import oasis

LOG = logging.getLogger(__name__)


class CreateForm(forms.SelfHandlingForm):

    name = forms.CharField(max_length=255, label=_("NodePool Name"))
    policy = forms.ChoiceField(label=_("NodePool Policy"), required=False)

    def __init__(self, request, *args, **kwargs):
        super(CreateForm, self).__init__(request, *args, **kwargs)

        policies = self._get_policy_list(request)
        if policies:
            self.fields['policy'].choices = policies
        else:
            del self.fields['policy']

    def _get_policy_list(self, request):

        try:
            policies = oasis.node_pool_policy_list(request)
        except Exception:
            msg = _('Failed to get policy list.')
            LOG.info(msg)
            messages.warning(request, msg)
            policies = []

        choices = [(policy['id'], policy['name'])
                   for policy in policies]
        if choices:
            choices.insert(0, ("", _("Select policy")))
        return choices


    def handle(self, request, data):
        try:
            args = {
                'name': data['name'],
                'policy_id': data['policy']
            }

            oasis.node_pool_create(request, args)
            messages.success(request,
                             _('Your nodepool has been created.'))
        except Exception:
            msg = _('Failed to update policy')
            LOG.info(msg)
            exceptions.handle(request, msg)