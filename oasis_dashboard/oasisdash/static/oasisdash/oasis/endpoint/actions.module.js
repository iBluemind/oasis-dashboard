(function () {
    'use strict';
    angular.module('horizon.dashboard.oasisdash.endpoint.actions', ['horizon.framework', 'horizon.dashboard.oasisdash'])
        .run(registerEndpointActions);

    registerEndpointActions.$inject = [
        'horizon.framework.conf.resource-type-registry.service',
        'horizon.framework.util.i18n.gettext',
        'horizon.dashboard.oasisdash.endpoint.create.service',
        'horizon.dashboard.oasisdash.endpoint.delete.service',
        'horizon.dashboard.oasisdash.endpoint.resourceType',
    ];

    function registerEndpointActions(registry,
                                     gettext,
                                     createEndpointService,
                                     deleteEndpointService,
                                     resourceType) {
        var endpointResourceType = registry.getResourceType(resourceType);
        endpointResourceType.batchActions
            .append(
            {
                id: 'createEndpointAction',
                service: createEndpointService,
                template: {
                    type: 'create',
                    text: gettext('Create Endpoint')
                }
            }
        );

        //.append({
        //    id: 'deleteEndpointAction',
        //    service: deleteEndpointService,
        //    template: {
        //        type: 'delete',
        //        text: gettext('Delete Endpoint')
        //    }
        //});
        endpointResourceType.itemActions
            .append(
            {
                id: 'deleteEndpointAction',
                service: deleteEndpointService,
                template: {
                    text: gettext('Delete')
                }
            }
        );

    }

})();
