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

def change_to_id(obj):
    """Change key named 'uuid' to 'id'

    Oasis returns objects with a field called 'uuid' many of Horizons
    directives however expect objects to have a field called 'id'.
    """
    obj['id'] = obj.pop('id')
    return obj


class Function(base.APIResourceWrapper):
    _attrs = ['id', 'project_id', 'stack_id', 'status', 'name', 'body', 'trust_id', 'trustee_username', 'trustee_user_id', 'turestee_password']


class Policy(base.APIResourceWrapper):
    _attrs = ['id', 'project_id', 'user_id', 'name', 'total_vm_count', 'vm_count_per_user']


@memoized
def oasisclient(request):

    oasis_url = ""

    try:
        oasis_url = base.url_for(request, 'oasis')
    except exceptions.ServiceCatalogException:
        LOG.debug('No Oasis service is configured.')
        return None

    insecure = getattr(settings, 'OPENSTACK_SSL_NO_VERIFY', False)
    cacert = getattr(settings, 'OPENSTACK_SSL_CACERT', None)
    LOG.debug(oasis_url)

    return oasis_client.Client(username=request.user.username,
                               project_id=request.user.tenant_id,
                               input_auth_token=request.user.token.id,
                               oasis_url=oasis_url,
                               insecure=insecure)


def node_pool_get(request, id):
    return oasisclient(request).nodepool.get(id)


def node_pool_create(request, params):
    return oasisclient(request).nodepool.create(**params)


def node_pool_list(request):
    return oasisclient(request).nodepool.list()


def node_pool_update(request, nodepool_id, params):
    return oasisclient(request).nodepool.update(nodepool_id, **params)


def node_pool_delete(request, nodepool_id):
    return oasisclient(request).nodepool.delete(nodepool_id)


def node_pool_policy_create(request, params):
    return oasisclient(request).nodepool_policy.create(**params)


def node_pool_policy_update(request, policy_id, params):
    return oasisclient(request).nodepool_policy.update(policy_id, **params)


def node_pool_policy_list(request):
    return oasisclient(request).nodepool_policy.list()


def node_pool_policy_delete(request, policy_id):
    return oasisclient(request).nodepool_policy.delete(policy_id)


def node_pool_policy_get(request, id):
    return oasisclient(request).nodepool_policy.get(id)


def function_get(request, function_id):
    return oasisclient(request).function.get(function_id)


def function_list(request):
    """Returns all functions."""
    return oasisclient(request).function.list()


def function_update(request, id, params):
    return oasisclient(request).function.update(id, params)


def function_delete(request, id):
    return oasisclient(request).function.delete(id)


def function_create(request, **params):
    return oasisclient(request).function.create(**params)


def endpoint_create(request, **params):
    return oasisclient(request).endpoint.create(**params)


def endpoint_get(request, id):
    return oasisclient(request).endpoint.get(id)


def endpoint_list(request):
    return oasisclient(request).endpoint.list()


def endpoint_update(request, id, params):
    return oasisclient(request).endpoint.update(id, params)


def endpoint_delete(request, id):
    return oasisclient(request).endpoint.delete(id)


def httpapi_create(request, **params):
    return oasisclient(request).httpapi.create(**params)


def httpapi_list(request):
    return oasisclient(request).httpapi.list()


def httpapi_get(request, id):
    return oasisclient(request).httpapi.get(id)


def request_list(request):
    return oasisclient(request).request.list()


def request_create(request, **params):
    return oasisclient(request).request.create(**params)


def requestheader_list(request):
    return oasisclient(request).request_header.list()


def requestheader_create(request, **params):
    return oasisclient(request).request_header.create(**params)


def request_create(request, **params):
    return oasisclient(request).request.create(**params)


def response_list(request):
    return oasisclient(request).response.list()


def response_create(request, **params):
    return oasisclient(request).response.create(**params)


def responsecode_create(request, **params):
    return oasisclient(request).response_code.create(**params)


def responsecode_list(request):
    return oasisclient(request).response_code.list()


def responsemessage_create(request, **params):
    return oasisclient(request).response_message.create(**params)


def responsemessage_list(request):
    return oasisclient(request).response_message.list()

