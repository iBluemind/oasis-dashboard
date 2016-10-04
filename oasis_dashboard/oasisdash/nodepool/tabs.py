# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

from django.utils.translation import ugettext_lazy as _

from horizon import exceptions
from horizon import tabs
from horizon.utils import functions as utils

from oasis_dashboard.oasisdash.nodepool.nodepool import tables as nodepool_tables
from oasis_dashboard.oasisdash.nodepool.policy import tables as policy_tables

from oasis_dashboard.api import oasis


class Map(dict):
    """
    Example:
    m = Map({'first_name': 'Eduardo'}, last_name='Pool', age=24, sports=['Soccer'])
    """
    def __init__(self, *args, **kwargs):
        super(Map, self).__init__(*args, **kwargs)
        for arg in args:
            if isinstance(arg, dict):
                for k, v in arg.iteritems():
                    self[k] = v

        if kwargs:
            for k, v in kwargs.iteritems():
                self[k] = v

    def __getattr__(self, attr):
        return self.get(attr)

    def __setattr__(self, key, value):
        self.__setitem__(key, value)

    def __setitem__(self, key, value):
        super(Map, self).__setitem__(key, value)
        self.__dict__.update({key: value})

    def __delattr__(self, item):
        self.__delitem__(item)

    def __delitem__(self, key):
        super(Map, self).__delitem__(key)
        del self.__dict__[key]


class PolicyTab(tabs.TableTab):
    table_classes = (policy_tables.NodePoolPolicyTable,)
    name = _("NodePool Policy")
    slug = "nodepoolpolicytab"
    template_name = "horizon/common/_detail_table.html"

    def get_nodepoolpolicytable_data(self):

        example_policy = Map()
        example_policy.id = 'aaa'
        example_policy.policy_name = 'policy1'
        example_policy.create_time = '2016-10-04'
        example_policy2 = Map()
        example_policy2.id = 'aaa2'
        example_policy2.policy_name = 'policy2'
        example_policy2.create_time = '2016-10-04'
        example_policy3 = Map()
        example_policy3.id = 'aaa3'
        example_policy3.policy_name = 'policy3'
        example_policy3.create_time = '2016-10-04'
        example_policy4 = Map()
        example_policy4.id = 'aaa4'
        example_policy4.policy_name = 'policy4'
        example_policy4.create_time = '2016-10-04'
        policies = [
            example_policy,
            example_policy2,
            example_policy3,
            example_policy4,

        ]
        # request = self.tab_group.request
        # policy = self.get_context_data(request)['policy']
        # policies.append({'policy_name': policy})
        return policies


class NodePoolTab(tabs.TableTab):
    table_classes = (nodepool_tables.NodePoolTable,)
    name = _("NodePool")
    slug = "nodepooltab"
    template_name = "horizon/common/_detail_table.html"

    def get_nodepooltable_data(self):
        request = self.tab_group.request

        return oasis.node_pool_policy_list(request)


class NodePoolTabs(tabs.TabGroup):
    slug = "nodepooltabs"
    tabs = (PolicyTab, NodePoolTab,)
    sticky = True
