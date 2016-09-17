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

    Magnum returns objects with a field called 'uuid' many of Horizons
    directives however expect objects to have a field called 'id'.
    """
    obj['id'] = obj.pop('id')
    return obj


@urls.register
class Function(generic.View):
    """API for retrieving a single bay"""
    url_regex = r'oasis/function/(?P<function_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, function_id):
        """Get a specific bay"""
        return oasis.function_get(request, function_id)

@urls.register
class Functions(generic.View):
    """API for Magnum Baymodels"""
    url_regex = r'oasis/function/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a specific baymodel"""
        result = oasis.function_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Baymodel.

        Returns the new Baymodel object on success.
        """
        LOG.debug('***************call create function************')
        oasis.function_create(request, **request.DATA)
        # return rest_utils.CreatedResponse(
        #     '/api/containers/baymodel/%s' % new_function.uuid,
        #     new_function.to_dict())

