#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse_lazy

from horizon import tables


class CreateNodePoolAction(tables.LinkAction):
    name = "create"
    verbose_name = _("Create Policy")
    url = "horizon:oasisdash:nodepool:nodepool:create"
    classes = ("ajax-modal",)
    icon = "plus"


class EditNodePoolAction(tables.LinkAction):
    name = "update"
    verbose_name = _("Edit Policy")
    url = reverse_lazy("horizon:oasisdash:nodepool:policy:update")
    classes = ("ajax-modal",)
    icon = "pencil"
    policy_rules = (("network", "update_network"),)


class NodePoolTable(tables.DataTable):
    nodepool_name = tables.Column("nodepool_name",
                        link="horizon:oasisdash:nodepool:nodepool:update",
                        verbose_name=_("NodePool Name"))

    create_time = tables.Column("create_time",
                                verbose_name=_("Create Time"))

    def get_object_id(self, obj):
        return "%s-%s" % (obj['id'], obj['nodepool_name'])

    class Meta(object):
        name = "nodepooltable"
        verbose_name = _("NodePool")
        table_actions = (CreateNodePoolAction,)