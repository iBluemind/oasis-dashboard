from django.core.urlresolvers import reverse
from django.forms import ValidationError
from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import forms
from horizon import messages

from oasis_dashboard.api import oasis

import logging
LOG = logging.getLogger(__name__)


class DetailFunctionForm(forms.SelfHandlingForm):

    name = "function_form"
    function_name = forms.CharField(
        label=_("Function Name"),
        max_length=50,
        required=True)
    method = forms.ChoiceField(
        label=_("Method"))

    def handle(self, request, data):

        try:
            args = {
                'name' : data['function_name']
                 # 'vm_per_user' : data['vm_per_user']
            }

            oasis.function_create(request, args)
            messages.success(request,
                             _('Your policy has been updated.'))
        except Exception:
            msg = _('Failed to update policy')
            LOG.info(msg)
            exceptions.handle(request, msg)

    def __init__(self, request, *args, **kwargs):
        LOG.debug('***********init************')
        LOG.debug(kwargs)
        super(DetailFunctionForm, self).__init__(request, *args, **kwargs)
        choices = ([
            ('get','GET'),
            ('post','POST'),
            ('put','PUT'),
            ('delete','DELETE'),
        ])
        self.fields['method'].choices = choices