from django.core.urlresolvers import reverse
from django.forms import ValidationError
from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import forms
from horizon import messages


class DetailFunctionForm(forms.SelfHandlingForm):
    function_name = forms.CharField(
        label=_("Function Name"),
        max_length=50,
        required=True)
    method = forms.ChoiceField(
        label=_("Method"))

    def handle(self, request, data):
        pass

    def __init__(self, request, *args, **kwargs):
        super(DetailFunctionForm, self).__init__(request, *args, **kwargs)
        # choices = ["GET", "POST", "PUT", "DELETE"]
        choices = ([
            ('get','GET'),
            ('post','POST'),
            ('put','PUT'),
            ('delete','DELETE'),
        ])
        self.fields['method'].choices = choices
