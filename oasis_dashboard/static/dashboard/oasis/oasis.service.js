/**
 * Copyright 2015, Cisco Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.oasis', OasisAPI);

  OasisAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.util.i18n.gettext'
  ];

  function OasisAPI(apiService, toastService, gettext) {
    var service = {
      createFunction: createFunction,
      createPolicy : createPolicy,
      getFunction : getFunction,
      getPolicy : getPolicy,
      updateFunction : updateFunction,
      updatePolicy : updatePolicy,
      deleteFunction : deleteFunction,
      deletePolicy : deletePolicy
    };

    return service;

    ////////////
    //Function//
    ////////////

    function createFunction(params) {
        return apiService.post('/api/oasis/function/', params)
          .error(function() {
            toastService.add('error', gettext('Unable to create Bay.'));
          });
      }

    function getFunction(id) {
      return apiService.get('/api/oasis/function/' + id)
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Bay.'));
        });
    }

    function deleteFunction(id, suppressError) {
      var promise = apiService.delete('/api/oasis/function/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Bay with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }


    ///////////////
    /// Policy ////
    ///////////////

    function createPolicy() {

    }

    function getPolicy() {
      return apiService.get('/api/oasis/policy/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Bays.'));
        });
    }

    // FIXME(shu-mutou): Unused for batch-delete in Horizon framework in Feb, 2016.
    function deletePolicy(ids) {
      return apiService.delete('/api/oasis/policy/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Bays.'));
        });
    }


  }
}());
