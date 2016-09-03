#  Copyright 2015 Cisco Systems.
#
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


from __future__ import absolute_import
import logging

from django.conf import settings

from horizon import exceptions
from horizon.utils.memoized import memoized
from openstack_dashboard.api import base
from oasisclient.v1 import client as oasis_client

USER_AGENT = 'python-oasisclient'

LOG = logging.getLogger(__name__)



class Function(base.APIResourceWrapper):
    _attrs = ['id', 'project_id', 'stack_id', 'status', 'name', 'body', 'trust_id', 'trustee_username', 'trustee_user_id', 'turestee_password']


class Policy(base.APIResourceWrapper):
    _attrs = ['id', 'project_id', 'user_id', 'name', 'total_vm_count', 'vm_count_per_user']


@memoized
def oasisclient(request):

    insecure = getattr(settings, 'OPENSTACK_SSL_NO_VERIFY', False)
    cacert = getattr(settings, 'OPENSTACK_SSL_CACERT', None)

    return oasis_client.Client(username=request.user.username,
                             project_id=request.user.tenant_id,
                             input_auth_token=request.user.token.id,
                             oasis_url="http://172.16.176.145:9417",
                             insecure=insecure,
                             cacert=cacert)


def policy_get(request):
    """Returns policy."""
    return oasisclient(request).policy.get()


def policy_update(request, params):
    oasisclient(request).policy.update(**params)


def function_get(request, function):
    pass


def function_list(request, sort_dir='desc', sort_key='created_at',
                 marker=None, paginate=False, reversed_order=False):
    """Returns all functions."""
    LOG.debug('******************** function list  call********************')
    oasisclient(request).function.list()


def function_update(request, function):
    pass


def function_delete(request, function):
    pass


def function_create(request, function):
    pass
