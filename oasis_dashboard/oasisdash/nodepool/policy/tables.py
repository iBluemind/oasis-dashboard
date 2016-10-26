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


class CreatePolicyAction(tables.LinkAction):
    name = "create"
    verbose_name = _("Create Policy")
    url = "horizon:oasisdash:nodepool:policy:create"
    classes = ("ajax-modal",)
    icon = "plus"


class EditPolicy(tables.LinkAction):
    name = "update"
    verbose_name = _("Edit Policy")
    url = "horizon:oasisdash:nodepool:policy:update"
    classes = ("ajax-modal",)
    policy_target_attrs = (("nodepool_policy_id", "id"),)


class DeletePolicy(policy.PolicyTargetMixin, tables.DeleteAction):
    @staticmethod
    def action_present(count):
        return ungettext_lazy(
            u"Delete Policy",
            u"Delete Policies",
            count
        )

    @staticmethod
    def action_past(count):
        return ungettext_lazy(
            u"Deleted Policy",
            u"Deleted Policies",
            count
        )

    def allowed(self, request, datum):
        return True

    def delete(self, request, obj_id):
        oasis.node_pool_policy_delete(request, obj_id)


class NodePoolPolicyTable(tables.DataTable):
    name = tables.Column("name",
                         link="horizon:oasisdash:nodepool:policy:detail",
                         verbose_name=_("PolicyName"))

    created_at = tables.Column("created_at", verbose_name=_("Create Time"))

    # def get_object_id(self, obj):
    #     return "%s-%s" % (obj['id'], obj['name'])

    class Meta(object):
        name = "policy"
        verbose_name = _("NodePool Policy")
        table_actions = (CreatePolicyAction,)
        row_actions = (EditPolicy, DeletePolicy)
