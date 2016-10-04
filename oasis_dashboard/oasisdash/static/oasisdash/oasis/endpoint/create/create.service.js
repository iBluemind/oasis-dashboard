(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name horizon.dashboard.containers.bays.create.service
     * @description Service for the containers bay create modal
     */
    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .factory('horizon.dashboard.oasisdash.endpoint.create.service', createService);

    createService.$inject = [
        'horizon.dashboard.oasisdash.endpoint.endpointModel',
        'horizon.framework.widgets.modal.wizard-modal.service',
        'horizon.framework.widgets.toast.service',
        'horizon.dashboard.oasisdash.endpoint.createworkflow',
        'horizon.dashboard.oasisdash.endpoint.events',
        'horizon.framework.util.i18n.gettext',
        'horizon.framework.util.q.extensions'
    ];

    function createService(model, wizardModalService, toast, createWorkflow, events, gettext, $qExtensions) {
        var scope;
        var message = {
            success: gettext('Bay %s was successfully created.')
        };

        var service = {
            initScope: initScope,
            allowed: allowed,
            perform: perform,
        };

        function initScope($scope) {
            scope = $scope;

            scope.workflow = createWorkflow;
            scope.model = model;
            scope.$on('$destroy', function () {
            });
        }

        function allowed(selected) {
            return $qExtensions.booleanAsPromise(true);
        }

        function perform(selected) {
            //scope.model.init();
            scope.selected = selected;
            wizardModalService.modal({
                scope: scope,
                workflow: createWorkflow,
                submit: submit
            });
        }

        function submit() {
            console.log(model.endpoint);
            return model.createEndpoint().then(success);
        }

        function success(response) {
            console.log(response);
            //toast.add('success', interpolate(message.success, response.data.id));
            scope.$emit(events.CREATE_SUCCESS, response.data);
        }

        return service;
    }
})();