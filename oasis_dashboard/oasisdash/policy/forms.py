from django.core.urlresolvers import reverse
from django.forms import ValidationError
from django.utils.translation import ugettext_lazy as _
import logging

from horizon import exceptions
from horizon import forms
from horizon import messages

from oasis_dashboard.api import oasis

LOG = logging.getLogger(__name__)


class CreatePolicyForm(forms.SelfHandlingForm):
    total_vm = forms.IntegerField(
        label=_("Total VM"),
        min_value=1,
        help_text=_('Input Total VM'),
        required=True)
    vm_per_user = forms.IntegerField(
        label=_("VM per User"),
        min_value=1,
        help_text=_('Input VM per User'),
        required=True)

    def handle(self, request, data):
        try:

            args = {
                'total_vm' : data['total_vm'],
                 'vm_per_user' : data['vm_per_user']

            }

            oasis.policy_update(request, args)
            messages.success(request,
                             _('Your policy has been updated.'))
        except Exception:
            msg = _('Failed to update policy')
            LOG.info(msg)
            exceptions.handle(request, msg)
