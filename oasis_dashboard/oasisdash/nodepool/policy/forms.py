from django.utils.translation import ugettext_lazy as _
import logging

from horizon import exceptions
from horizon import forms
from horizon import messages

from oasis_dashboard.api import oasis

LOG = logging.getLogger(__name__)

"""
min_size = Column(Integer())
    max_size = Column(Integer())
    scaleup_adjust = Column(Integer())
    scaledown_adjust = Column(Integer())
    scaleup_cooldown = Column(Integer())
    scaledown_cooldown = Column(Integer())
    scaleup_period = Column(Integer())
    scaleup_evaluation_periods = Column(Integer())
    scalueup_threshold = Column(Integer())
    scaledown_scale_period = Column(Integer())
    scaledown_evaluation_periods = Column(Integer())
    scaledown_threshold = Column(Integer())
"""


class CreateForm(forms.SelfHandlingForm):
    name = forms.CharField(
        label=_("Name"),
        widget=forms.TextInput())

    min_size = forms.IntegerField(
        label=_("Nodepool Min Size"),
        min_value=1,
        help_text=_('Input min size'),
        required=True)

    max_size = forms.IntegerField(
        label=_("NodePool Max Size"),
        min_value=1,
        help_text=_('Input max size'),
        required=True)

    scaleup_adjust = forms.IntegerField(
        label=_("Scaleup Adjust"),
        min_value=1,
        help_text=_('Up number per one time'),
        required=True)

    scaleup_cooldown = forms.IntegerField(
        label=_("Scaleup cooldown"),
        min_value=1,
        help_text=_('cooldown Peroid scale up'),
        required=True)

    scaleup_period = forms.IntegerField(
        label=_("Scaleup Period"),
        min_value=1,
        help_text=_('Input scaleup period'),
        required=True)

    scaleup_evaluation_periods = forms.IntegerField(
        label=_("Scaleup Evaluation Period"),
        min_value=1,
        help_text=_('Input scaleup evaluation period'),
        required=True)

    scaleup_threshold = forms.IntegerField(
        label=_("Scaleup Threshold"),
        min_value=1,
        help_text=_('Input scaleup threshold'),
        required=True)

    scaledown_adjust = forms.IntegerField(
        label=_("Scaledown Adjust"),
        min_value=1,
        help_text=_('Down number per one time'),
        required=True)

    scaledown_cooldown = forms.IntegerField(
        label=_("Scaledown cooldown"),
        min_value=1,
        help_text=_('cooldown period scale down'),
        required=True)

    scaledown_period = forms.IntegerField(
        label=_("Scaledown Scale Period"),
        min_value=1,
        help_text=_('Input scaledown scale period'),
        required=True)

    scaledown_evaluation_periods = forms.IntegerField(
        label=_("Scaledown Evaluation Periods"),
        min_value=1,
        help_text=_('Input scaledown evaluation periods'),
        required=True)

    scaledown_threshold = forms.IntegerField(
        label=_("Scaledown Threshold"),
        min_value=1,

        help_text=_('Input scaledown threshold'),
        required=True)

    def handle(self, request, data):
        try:
            args = {
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
                'min_size': data['min_size']
            }
            LOG.debug("@@@@@@@@@@@@@@@@@@Create policy@@@@@@@@@@@@@@@@@@@")
            LOG.debug(args)
            policy = oasis.node_pool_policy_create(request, args)
            messages.success(request,
                             _('Your nodepool policy has been created.'))
            request.session['policy'] = args
            return policy

        except Exception:
            msg = _('Failed to update policy')
            LOG.info(msg)
            exceptions.handle(request, msg)


class UpdateForm(forms.SelfHandlingForm):
    policy_id = forms.CharField(
        label=_("ID"),
        widget=forms.TextInput(
            attrs={'readonly': 'readonly'}))

    max_size = forms.IntegerField(
        label=_("NodePool Max Size"),
        min_value=1,
        help_text=_('Input max size'),
        required=True)

    min_size = forms.IntegerField(
        label=_("Nodepool Min Size"),
        min_value=1,
        help_text=_('Input min size'),
        required=True)

    scaledown_adjust = forms.IntegerField(
        label=_("Scaledown Adjust"),
        min_value=1,
        help_text=_('Down number per one time'),
        required=True)

    scaleup_adjust = forms.IntegerField(
        label=_("Scaleup Adjust"),
        min_value=1,
        help_text=_('Up number per one time'),
        required=True)

    scaleup_cooldown = forms.IntegerField(
        label=_("Scaleup cooldown"),
        min_value=1,
        help_text=_('cooldown Peroid scale up'),
        required=True)

    scaledown_cooldown = forms.IntegerField(
        label=_("Scaledown cooldown"),
        min_value=1,
        help_text=_('cooldown period scale down'),
        required=True)

    scaleup_period = forms.IntegerField(
        label=_("Scaleup Period"),
        min_value=1,
        help_text=_('Input scaleup period'),
        required=True)

    scaleup_evaluation_periods = forms.IntegerField(
        label=_("Scaleup Evaluation Period"),
        min_value=1,
        help_text=_('Input scaleup evaluation period'),
        required=True)

    scalueup_threshold = forms.IntegerField(
        label=_("Scaleup Threshold"),
        min_value=1,
        help_text=_('Input scaleup threshold'),
        required=True)

    scaledown_scale_period = forms.IntegerField(
        label=_("Scaledown Scale Period"),
        min_value=1,
        help_text=_('Input scaledown scale period'),
        required=True)

    scaledown_evaluation_periods = forms.IntegerField(
        label=_("Scaledown Evaluation Periods"),
        min_value=1,
        help_text=_('Input scaledown evaluation periods'),
        required=True)

    scaledown_threshold = forms.IntegerField(
        label=_("Scaledown Threshold"),
        min_value=1,

        help_text=_('Input scaledown threshold'),
        required=True)

    def handle(self, request, data):
        try:
            args = {
                'scaledown_threshold': data['scaledown_threshold'],
                'scaledown_evaluation_periods': data['scaledown_evaluation_periods'],
                'scaledown_scale_period': data['scaledown_scale_period'],
                'scalueup_threshold': data['scalueup_threshold'],
                'scaleup_evaluation_periods ': data['scaleup_evaluation_periods'],
                'scaleup_period': data['scaleup_period'],
                'scaledown_cooldown': data['scaledown_cooldown'],
                'scaleup_cooldown': data['scaleup_cooldown'],
                'scaledown_adjust': data['scaledown_adjust'],
                'scaleup_adjust': data['scaleup_adjust'],
                'max_size': data['max_size'],
                'min_size': data['min_size']
            }

            policy = oasis.node_pool_policy_update(request, data['policy_id'], args)
            messages.success(request,
                             _('Your nodepool policy has been updated.'))

            return policy

        except Exception:
            msg = _('Failed to update policy')
            LOG.info(msg)
            exceptions.handle(request, msg)
