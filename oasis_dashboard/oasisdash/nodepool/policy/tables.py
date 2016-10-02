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

from django.core.urlresolvers import reverse_lazy
from django.utils.translation import ugettext_lazy as _

from horizon import tables


class CreatePolicyAction(tables.LinkAction):
    name = "create"
    verbose_name = _("Create Policy")
    url = reverse_lazy("horizon:oasisdash:nodepool:policy:create")
    classes = ("ajax-modal",)
    icon = "plus"


class EditPolicyAction(tables.LinkAction):
    name = "update"
    verbose_name = _("Edit Policy")
    url = reverse_lazy("horizon:oasisdash:nodepool:policy:update")
    classes = ("ajax-modal",)
    icon = "pencil"
    policy_rules = (("network", "update_network"),)


class NodePoolPolicyTable(tables.DataTable):
    name = tables.Column("nodepool_policy_name",
                         link="horizon:admin:hypervisors:detail",
                         verbose_name=_("PolicyName"))

    create_time = tables.Column("create_time",
                                verbose_name=_("Create Time"))

    class Meta(object):
        name = "nodepoolpolicytable"
        verbose_name = _("NodePool Policy")
        table_actions = (CreatePolicyAction,)

