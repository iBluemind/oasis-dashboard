(function() {
    'use strict';

    angular
        .module('horizon.oasisdash.function')
        .controller('MyController', MyController);

    MyController.$inject = [
        'horizon.framework.widget.toast.service',
        '$http'
    ];

    function MyController(toast, $http) {
        var ctrl = this;

        toast.add('info', 'Please browse our fresh local fruits!')
        $http.get('/static/oasisdash/oasis/function/data.json')
            .success(function(data) {
                ctrl.fruits = data;
            })
    }
})();