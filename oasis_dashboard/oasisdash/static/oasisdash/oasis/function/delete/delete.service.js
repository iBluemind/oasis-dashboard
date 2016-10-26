/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use self file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  angular
    .module('horizon.dashboard.oasisdash.function')
    .factory('horizon.dashboard.oasisdash.function.delete.service', deleteService);

  deleteService.$inject = [
    'horizon.app.core.openstack-service-api.oasisdash',
    'horizon.app.core.openstack-service-api.policy',
    'horizon.framework.widgets.modal.deleteModalService',
    'horizon.framework.util.i18n.gettext',
    'horizon.framework.util.q.extensions',
    'horizon.dashboard.oasisdash.function.events'
  ];

  function deleteService(
    oasis, policy, deleteModalService, gettext, $qExtensions, events
  ) {
    var scope;
    var context = {
      labels: null,
      deleteEntity: deleteEntity,
      successEvent: events.DELETE_SUCCESS
    };

    var service = {
      initScope: initScope,
      allowed: allowed,
      perform: perform
    };

    return service;

    //////////////

    // include this function in your service
    // if you plan to emit events to the parent controller
    function initScope($scope) {
      scope = $scope;
    }

    function allowed() {
      return $qExtensions.booleanAsPromise(true);
    }

    // delete selected resource objects
    function perform(selected) {
      if(!selected.hasOwnProperty('id')){
        // batch (multi)
        context.labels = labelize(selected.length);
        $qExtensions.allSettled(selected.map(checkPermission)).then(afterCheck);
      }else{
        // row (single)
        context.labels = labelize(1);
        deleteModalService.open(scope, [selected], context);
      }
    }

    function labelize(count){
      return {
        title: ngettext('Confirm Delete Function',
                        'Confirm Delete Functions', count),
        /* eslint-disable max-len */
        message: ngettext('You have selected "%s". Please confirm your selection. Deleted function is not recoverable.',
                          'You have selected "%s". Please confirm your selection. Deleted function are not recoverable.', count),
        /* eslint-enable max-len */
        submit: ngettext('Delete Function',
                         'Delete Functions', count),
        success: ngettext('Deleted Function: %s.',
                          'Deleted Functions: %s.', count),
        error: ngettext('Unable to delete Function: %s.',
                        'Unable to delete Functions: %s.', count)
      };
    }

    // for batch delete
    function checkPermission(selected) {
      return {promise: allowed(selected), context: selected};
    }

    // for batch delete
    function afterCheck(result){
      if (result.fail.length > 0) {
        toast.add('error', getMessage(notAllowedMessage, result.fail));
      }
      if (result.pass.length > 0) {
        deleteModalService.open(scope, result.pass.map(getEntity), context);
      }
    }

    // for batch delete
    function getEntity(result) {
      return result.context;
    }

    // call delete REST API
    function deleteEntity(id){
      console.log('delete ' + id);
      return oasis.deleteFunction(id, true);
    }
  }
})();
