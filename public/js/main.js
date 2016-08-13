'use strict';

'use strict';

(function () {
    // Angular app
    const module = angular.module('app', ['ui.router']);

    module.config(($urlRouterProvider) => {
        $urlRouterProvider.otherwise("/");
    });
}());