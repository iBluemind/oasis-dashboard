

from django.core.urlresolvers import reverse_lazy
from django.utils.translation import pgettext_lazy
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ungettext_lazy

from horizon import tables

from oasis_dashboard import api


class MyFilterAction(tables.FilterAction):
    name = "myfilter"


def get_function_link(function):
    return reverse_lazy('horizon:oasisdash:function:index', args=[function.function_id])


class FunctionTable(tables.DataTable):
    function_name = tables.Column("function_name", verbose_name=_("Function Name"))
    user_name = tables.Column("user_name", verbose_name=_("User Name"))
    project_id = tables.Column("project_id", verbose_name=_("Project Id"))

    # name = tables.Column('name', \
    #                      verbose_name=_("Name"))
    # status = tables.Column('status', \
    #                        verbose_name=_("Status"))
    # zone = tables.Column('availability_zone', \
    #                      verbose_name=_("Availability Zone"))
    # image_name = tables.Column('image_name', \
    #                            verbose_name=_("Image Name"))

    def get_object_id(self, obj):
        return "%s-%s" % (obj.binary, obj.host)

    class Meta(object):
        name = "functions"
        verbose_name = _("Functions")
        table_actions = (MyFilterAction,)