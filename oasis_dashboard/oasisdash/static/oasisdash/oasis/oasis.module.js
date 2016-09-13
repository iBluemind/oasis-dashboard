(function(){
    'use strict';

    angular
        .module('horizon.oasisdash',[
            'horizon.oasisdash.function'
        ])
        .config(config);

    config.$inject = ['$provide', '$windowProdiver'];
    function config($provide, $windowProvider){
        var path = $windowProvider.$get().STATIC_URL + 'oasisdash/oasis/';
        $provide.constant('horizon.oasisdash.basePath', path);
    }
})();