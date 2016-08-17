/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
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

  /**
   * @ngdoc overview
   * @ngname horizon.dashboard.container-infra.bays.actions
   *
   * @description
   * Provides all of the actions for bays.
   */
  angular.module('horizon.dashboard.oasis.policy.actions', ['horizon.framework', 'horizon.dashboard.oasis'])
   .run(registerPolicyActions);

  registerPolicyActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.oasis.policy.create.service',
    'horizon.dashboard.oasis.policy.delete.service',
    'horizon.dashboard.oasis.policy.resourceType',
  ];

  function registerPolicyActions(
    registry,
    gettext,
    createPolicyService,
    updatePolicyService,
    deletePolicyService,
    resourceType)
  {
    var policyResourceType = registry.getResourceType(resourceType);
    policyResourceType.itemActions
      .append({
        id: 'deletePolicyAction',
        service: deletePolicyService,
        template: {
          type: 'delete',
          text: gettext('Delete Policy')
        }
      });

    policyResourceType.batchActions
      .append({
        id: 'createPolicyAction',
        service: createPolicyService,
        template: {
          type: 'create',
          text: gettext('Create Policy')
        }
      })
      .append({
        id: 'updatePolicyAction',
        service: updatePolicyService,
        template: {
          type: 'update',
          text: gettext('Update Policy')
        }
      });
  }

})();
