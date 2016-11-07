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
    print 'pppp'
    print obj
    print 'pppp'
    obj['id'] = obj.pop('id')
    return obj


@urls.register
class NodePoolPolicies(generic.View):
    """API for Oasis Functions"""
    url_regex = r'oasis/nodepools/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get function list"""
        result = oasis.node_pool_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}


@urls.register
class Function(generic.View):
    """API for retrieving a single function"""
    url_regex = r'oasis/function/(?P<function_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, function_id):
        """Get a specific function"""
        return oasis.function_get(request, function_id).to_dict()

    @rest_utils.ajax(data_required=True)
    def patch(self, request, function_id):
        """Update a Function.

        Returns the Function object on success.
        """
        LOG.debug('***************call update function************')
        new_function = oasis.function_update(request, function_id, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/functions/%s' % new_function.id,
            new_function.to_dict())

    @rest_utils.ajax()
    def delete(self, request, function_id):
        """Delete Function by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        oasis.function_delete(request, function_id)


@urls.register
class Functions(generic.View):
    """API for Oasis Functions"""
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
            '/api/oasis/endpoints/%s' % new_endpoint.id,
            new_endpoint.to_dict())


@urls.register
class EndPoint(generic.View):
    """API for Oasis Endpoints"""
    url_regex = r'oasis/endpoint/(?P<endpoint_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, endpoint_id):
        """Get a specific endpoint"""
        return oasis.endpoint_get(request, endpoint_id).to_dict()

    @rest_utils.ajax(data_required=True)
    def patch(self, request, endpoint_id):
        """Update a Endpoint.

        Returns the Endpoint object on success.
        """
        LOG.debug('***************call update endpoint************')
        new_endpoint = oasis.endpoint_update(request, endpoint_id, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/endpoints/%s' % new_endpoint.id,
            new_endpoint.to_dict())

    @rest_utils.ajax()
    def delete(self, request, endpoint_id):
        """Delete Endpoint by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        oasis.endpoint_delete(request, endpoint_id)

@urls.register
class HttpApis(generic.View):
    """API for Oasis HttpApis"""
    url_regex = r'oasis/httpapis/$'

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new HttpApi.

        Returns the new HttpApi object on success.
        """
        LOG.debug('***************call create httpapi************')
        new_httpapi = oasis.httpapi_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/httpapis/%s' % new_httpapi.id,
            new_httpapi.to_dict())


@urls.register
class HttpApi(generic.View):
    """API for Oasis Endpoints"""
    url_regex = r'oasis/httpapi/(?P<endpoint_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, endpoint_id):
        """Get a specific httpapi"""
        result = oasis.httpapi_get(request, endpoint_id)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def patch(self, request, endpoint_id):
        """Update a Endpoint.

        Returns the Endpoint object on success.
        """
        LOG.debug('***************call update endpoint************')
        new_endpoint = oasis.endpoint_update(request, endpoint_id, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/endpoints/%s' % new_endpoint.id,
            new_endpoint.to_dict())

    @rest_utils.ajax()
    def delete(self, request, endpoint_id):
        """Delete Endpoint by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        oasis.endpoint_delete(request, endpoint_id)


@urls.register
class Responses(generic.View):
    """API for Oasis Responses"""
    url_regex = r'oasis/responses/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get response list"""
        LOG.debug('***************call response list************')
        result = oasis.response_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Response.

        Returns the new Response object on success.
        """
        LOG.debug('***************call response response************')
        new_response = oasis.response_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/responses/%s' % new_response.id,
            new_response.to_dict())


@urls.register
class ResponseCodes(generic.View):
    """API for Oasis Response Codes"""
    url_regex = r'oasis/responsecodes/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get response list"""
        LOG.debug('***************call response code list************')
        result = oasis.responsecode_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Response Code.

        Returns the new Response Code object on success.
        """
        LOG.debug('***************call response code list ************')
        new_responsecode = oasis.responsecode_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/responsecodes/%s' % new_responsecode.id,
            new_responsecode.to_dict())


@urls.register
class ResponseMessages(generic.View):
    """API for Oasis Response Messages"""
    url_regex = r'oasis/responsemessages/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get response list"""
        LOG.debug('***************call response message list************')
        result = oasis.responsemessage_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Response Code.

        Returns the new Response Code object on success.
        """
        LOG.debug('***************call response message list ************')
        new_responsemessage = oasis.responsemessage_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/responsemessages/%s' % new_responsemessage.id,
            new_responsemessage.to_dict())


@urls.register
class Requests(generic.View):
    """API for Oasis Requests"""
    url_regex = r'oasis/requests/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get response list"""
        LOG.debug('***************call request list************')
        result = oasis.request_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Request.

        Returns the new Request object on success.
        """
        LOG.debug('***************call request response************')
        new_request = oasis.request_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/requests/%s' % new_request.id,
            new_request.to_dict())


@urls.register
class RequestHeaders(generic.View):
    """API for Oasis RequestHeaders"""
    url_regex = r'oasis/requestheaders/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get response list"""
        LOG.debug('***************call request header list************')
        result = oasis.requestheader_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Request Header.

        Returns the new RequestHeader object on success.
        """
        LOG.debug('***************call request header ************')
        new_requestheader = oasis.requestheader_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/oasis/requestheaders/%s' % new_requestheader.id,
            new_requestheader.to_dict())
