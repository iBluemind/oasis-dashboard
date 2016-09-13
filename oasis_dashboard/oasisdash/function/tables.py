

from django.core.urlresolvers import reverse_lazy
from django.utils.translation import pgettext_lazy
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ungettext_lazy

from horizon import tables

from oasis_dashboard import api

import logging

LOG = logging.getLogger(__name__)


class MyFilterAction(tables.FilterAction):
    name = "myfilter"


class CreateFunction(tables.LinkAction):
    name = "create"
    verbose_name = _("Create Function")
    url = reverse_lazy("horizon:oasisdash:function:create")
    classes = ("ajax-modal",)
    icon = "plus"


class FunctionTable(tables.DataTable):
    function_name = tables.Column("function_name", verbose_name=_("Function Name"), link='horizon:oasisdash:function:detail')
    user_name = tables.Column("user_name", verbose_name=_("User Name"))
    project_id = tables.Column("project_id", verbose_name=_("Project Id"))

    def get_object_id(self, obj):
        return "%s-%s" % (obj['id'], obj['project_id'])

    class Meta(object):
        name = "functions"
        verbose_name = _("Functions")
        table_actions = (MyFilterAction, CreateFunction, )
