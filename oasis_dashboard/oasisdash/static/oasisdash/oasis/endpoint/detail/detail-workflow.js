(function () {
    'use strict';

    angular
        .module('horizon.dashboard.oasisdash.endpoint')
        .factory('horizon.dashboard.oasisdash.endpoint.detailworkflow', detailWorkflow);

    detailWorkflow.$inject = [
        'horizon.dashboard.oasisdash.basePath',
        'horizon.app.core.workflow.factory',
        'horizon.framework.util.i18n.gettext'
    ];

    function detailWorkflow(basePath, dashboardWorkflow, gettext) {
        return dashboardWorkflow({
            title: gettext('Setting Endpoint'),

            steps: [
                {
                    title: gettext('API Name'),
                    templateUrl: basePath + 'endpoint/detail/api/name.html',
                    formName: 'nameForm'
                },
                {
                    title: gettext('Request Header'),
                    templateUrl: basePath + 'endpoint/detail/header/request/request.html',
                    formName: 'requestForm'
                },
                {
                    title:gettext('Response'),
                    templateUrl: basePath + 'endpoint/detail/header/response/response.html',
                    formName : 'responseForm'
                }
            ],
            btnText: {
                finish: gettext('Create')
            },

            btnIcon: {
                finish: 'fa fa-check'
            }
        });
    }
})();