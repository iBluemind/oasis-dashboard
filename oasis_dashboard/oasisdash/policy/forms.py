from django.core.urlresolvers import reverse
from django.forms import ValidationError
from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import forms
from horizon import messages


class CreatePolicyForm(forms.SelfHandlingForm):
    vms = forms.IntegerField(
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
        return 'a'
