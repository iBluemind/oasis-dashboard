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

from django.views import generic

from oasis_dashboard.api import oasis

from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils

import logging

LOG = logging.getLogger(__name__)

def change_to_id(obj):
    """Change key named 'uuid' to 'id'

    Oasis returns objects with a field called 'uuid' many of Horizons
    directives however expect objects to have a field called 'id'.
    """
    obj['id'] = obj.pop('id')
    return obj


@urls.register
class Function(generic.View):
    """API for retrieving a single function"""
    url_regex = r'oasis/function/(?P<function_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, function_id):
        """Get a specific function"""
        return oasis.function_get(request, function_id)


@urls.register
class Functions(generic.View):
    """API for Oasis Baymodels"""
    url_regex = r'oasis/functions/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get function list"""
        result = oasis.function_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Function.

        Returns the new Function object on success.
        """
        new_function = oasis.function_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/functions/%s' % new_function.id,
            new_function.to_dict())



@urls.register
class EndPoints(generic.View):
    """API for Oasis Endpoints"""
    url_regex = r'oasis/endpoints/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get endpoint list"""
        LOG.debug('***************call endpoint list************')
        result = oasis.endpoint_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new EndPoint.

        Returns the new EndPoint object on success.
        """
        LOG.debug('***************call create endpoint************')
        new_endpoint = oasis.endpoint_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/endpoint/%s' % new_endpoint.id,
            new_endpoint.to_dict())


@urls.register
class EndPoint(generic.View):
    """API for Oasis Endpoints"""
    url_regex = r'oasis/endpoint/(?P<endpoint_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request):
        """Get endpoint list"""
        result = oasis.endpoint_get(request, '')
        return {'items': [change_to_id(n.to_dict()) for n in result]}

