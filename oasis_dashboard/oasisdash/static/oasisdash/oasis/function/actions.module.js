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

(function () {

    angular.module('horizon.dashboard.oasisdash.function.actions', ['horizon.framework', 'horizon.dashboard.oasisdash'])
        .run(registerFunctionActions);

    registerFunctionActions.$inject = [
        'horizon.framework.conf.resource-type-registry.service',
        'horizon.framework.util.i18n.gettext',
        'horizon.dashboard.oasisdash.function.delete.service',
        'horizon.dashboard.oasisdash.function.resourceType',
    ];

    function registerFunctionActions(registry,
                                     gettext,
                                     deleteFunctionService,
                                     resourceType) {

        var functionResourceType = registry.getResourceType(resourceType);
        functionResourceType.itemActions
            .append({
                id: 'deleteFunctionAction',
                service: deleteFunctionService,
                template: {
                    text: gettext('Delete')
                }
            })
    }

})();