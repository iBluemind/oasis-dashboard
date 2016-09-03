from django.core.urlresolvers import reverse
from django.forms import ValidationError
from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import forms
from horizon import messages


class CreateFunctionForm(forms.SelfHandlingForm):

    function = forms.CharField(
        max_length=255,
        widget=forms.Textarea(attrs={'rows': 50}),
        label=_("Function"),
        required=False)

    def handle(self, request, data):
        return 'a'