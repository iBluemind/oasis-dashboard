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
    url = reverse_lazy("horizon:oasisdash:nodepool:nodepool:create")
    classes = ("ajax-modal",)
    icon = "plus"


class NodePoolTable(tables.DataTable):
    id = tables.Column("nodepool_policy_id",
                       verbose_name=_("NodePool Id"))

    create_time = tables.Column("create_time",
                                verbose_name=_("Create Time"))

    class Meta(object):
        name = "nodepooltable"
        verbose_name = _("NodePool")
        table_actions = (CreateNodePoolAction,)