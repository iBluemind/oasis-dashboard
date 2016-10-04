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

import logging
LOG = logging.getLogger(__name__)


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

        items = [
            {
                'id': '1',
                'policy_name': 'policy1',
                'create_time': '2016-10-04'
            },
            {
                'id': '2',
                'policy_name': 'policy2',
                'create_time': '2016-10-04'
            },
            {
                'id': '3',
                'policy_name': 'policy3',
                'create_time': '2016-10-04'
            },
            {
                'id': '4',
                'policy_name': 'policy4',
                'create_time': '2016-10-04'
            }
        ]

        request = self.tab_group.request
        # policies = oasis.node_pool_policy_list(request)

        if request.session.get('policy', False):
            new_policy = request.session.get('policy')
            LOG.debug('***********************************session')
            LOG.debug(new_policy)
            policy = {
                'id': '5',
                'policy_name': 'policy5',
                'create_time': '2016-10-04'
            }
            items.append(policy)
            # choices.append((policy['id'], policy['policy_name'], policy['create_time']))

        # policy = self.get_context_data(request)['policy']
        # policies.append({'policy_name': policy})
        return items


class NodePoolTab(tabs.TableTab):
    table_classes = (nodepool_tables.NodePoolTable,)
    name = _("NodePool")
    slug = "nodepooltab"
    template_name = "horizon/common/_detail_table.html"

    def get_nodepooltable_data(self):

        items = [
            {
                'id': '1',
                'nodepool_name': 'nodepool1',
                'create_time': '2016-10-04'
            },
            {
                'id': '2',
                'nodepool_name': 'nodepool2',
                'create_time': '2016-10-04'
            },
            {
                'id': '3',
                'nodepool_name': 'nodepool3',
                'create_time': '2016-10-04'
            },
            {
                'id': '4',
                'nodepool_name': 'nodepool5',
                'create_time': '2016-10-04'
            }
        ]
        return items


class NodePoolTabs(tabs.TabGroup):
    slug = "nodepooltabs"
    tabs = (PolicyTab, NodePoolTab,)
    sticky = True
