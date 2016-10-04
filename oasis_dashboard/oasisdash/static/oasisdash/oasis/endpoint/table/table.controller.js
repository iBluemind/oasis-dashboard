(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name BaysTableController
     * @ngController
     *
     * @description
     * Controller for the container-infra bay table
     */
    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .controller('EndpointTableController', EndpointTableController);

    EndpointTableController.$inject = [
        '$scope',
        '$location',
        'horizon.app.core.openstack-service-api.oasisdash',
        'horizon.dashboard.oasisdash.endpoint.events',
        'horizon.framework.conf.resource-type-registry.service',
        'horizon.dashboard.oasisdash.endpoint.resourceType',
        'horizon.framework.widgets.modal.wizard-modal.service',
        'horizon.dashboard.oasisdash.endpoint.detailworkflow',
        'horizon.dashboard.oasisdash.endpoint.endpointDetailModel'
    ];

    function EndpointTableController($scope, $location, oasis, events, registry, endpointResourceType, wizardModalService, detailWorkFlow, model) {
        var ctrl = this;

        ctrl.createEndpoint = createEndpoint;
        ctrl.createEndpointAction = createEndpointAction;
        ctrl.endpoint = [];
        ctrl.endpointSrc = [];
        ctrl.endpointResource = registry.getResourceType(endpointResourceType);
        ctrl.showDetailModal = showDetailModal;

        function createEndpoint() {
            var localSpec = {
                backdrop: 'static',
                controller: 'CreateEndpointModalController as ctrl',
                templateUrl: basePath + 'create-endpoint-modal.html'
            };
            $modal.open(localSpec).result.then(function create(result) {
                return ctrl.createEndpointAction(result);
            });
        }

        function createEndpointAction(result) {
            //swiftAPI.createContainer(result.name, result.public).then(
            //    function success() {
            //        toastService.add('success', interpolate(
            //            gettext('Container %(name)s created.'), result, true
            //        ));
            //        // generate a table row with no contents
            //        ctrl.model.containers.push({name: result.name, count: 0, bytes: 0});
            //    }
            //);
        }

        /**
         * Filtering - client-side MagicSearch
         * all facets for endpoint table
         */
        ctrl.endpointFacets = [
            {
                'label': gettext('Name'),
                'name': 'name',
                'singleton': true
            },
            {
                'label': gettext('ID'),
                'name': 'id',
                'singleton': true
            },
            {
                'label': gettext('Status'),
                'name': 'status',
                'singleton': true
            }
        ];

        var createWatcher = $scope.$on(events.CREATE_SUCCESS, onCreateSuccess);
        //var deleteWatcher = $scope.$on(events.DELETE_SUCCESS, onDeleteSuccess);

        $scope.$on('$destroy', destroy);

        init();

        function init() {
            registry.initActions(endpointResourceType, $scope);
            oasis.getEndpoints().success(getEndpointsSuccess);
            //var items = [
            //    {
            //        id: '1e23ur919dh',
            //        name: 'endpoint1',
            //        status: 'running'
            //    },
            //    {
            //        id: '289f298r9',
            //        name: 'endpoint2',
            //        status: 'running'
            //    }
            //]
            //ctrl.endpointSrc = items;
        }

        function getEndpointsSuccess(response) {
            console.log('end point get')
            ctrl.endpointSrc = response;
        }

        function onCreateSuccess(e, createdItem) {
            console.log('end point create')
            ctrl.endpointSrc.push(createdItem);
            e.stopPropagation();
        }

        function showDetailModal(func) {
            $scope.params = func;
            $scope.model = model;
            wizardModalService.modal({
                scope: $scope,
                workflow: detailWorkFlow,
                submit: submit
            });
        }

        function submit() {

        }

        //endpoint onDeleteSuccess(e, removedIds) {
        //    ctrl.baysSrc = difference(ctrl.baysSrc, removedIds, 'id');
        //    e.stopPropagation();
        //
        //    // after deleting the items
        //    // we need to clear selected items from table controller
        //    $scope.$emit('hzTable:clearSelected');
        //}

        function difference(currentList, otherList, key) {
            return currentList.filter(filter);

            function filter(elem) {
                return otherList.filter(function filterDeletedItem(deletedItem) {
                        return deletedItem === elem[key];
                    }).length === 0;
            }
        }

        function destroy() {
            createWatcher();
            //deleteWatcher();
        }
    }

})();
