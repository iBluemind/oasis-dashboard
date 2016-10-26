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
from django.utils.translation import ungettext_lazy
from openstack_dashboard import policy
from horizon import tables
from oasis_dashboard.api import oasis

class CreateNodePoolAction(tables.LinkAction):
    name = "create"
    verbose_name = _("Create NodePool")
    url = "horizon:oasisdash:nodepool:nodepool:create"
    classes = ("ajax-modal",)
    icon = "plus"


class EditNodePoolAction(tables.LinkAction):
    name = "update"
    verbose_name = _("Edit NodePool")
    url = "horizon:oasisdash:nodepool:nodepool:update"
    classes = ("ajax-modal",)
    policy_rules = (("nodepool_id", "id"),)


class DeleteNodePoolAction(policy.PolicyTargetMixin, tables.DeleteAction):
    @staticmethod
    def action_present(count):
        return ungettext_lazy(
            u"Delete NodePool",
            u"Delete NodePools",
            count
        )

    @staticmethod
    def action_past(count):
        return ungettext_lazy(
            u"Deleted NodePool",
            u"Deleted NodePools",
            count
        )

    def allowed(self, request, datum):
        return True

    def delete(self, request, obj_id):
        oasis.node_pool_delete(request, obj_id)


class NodePoolTable(tables.DataTable):
    name = tables.Column("name",
                        link="horizon:oasisdash:nodepool:nodepool:detail",
                        verbose_name=_("NodePool Name"))

    created_at = tables.Column("created_at",
                                verbose_name=_("Create Time"))

    class Meta(object):
        name = "nodepool"
        verbose_name = _("NodePool")
        table_actions = (CreateNodePoolAction, )
        row_actions = (EditNodePoolAction, DeleteNodePoolAction)