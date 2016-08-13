'use strict';

(function () {
    const namespace = 'article';
    const module = angular.module('app');

    const template = `
        <section>
            <h2>{{ctrl.article.title}}</h2>
            <h4>{{ctrl.article.createdAt | date:short}}</h4>
            <div>
                <p ng-repeat="p in (ctrl.article.content | brlines) track by $index">
                    {{p}}
                </p>
            </div>
        </section>
        <comments-block article-id="ctrl.article._id"></comments-block>
    `;

    const Ctrl = function (article) {
        let ctrl = this;
        article.content
        ctrl.article = article;
    };

    const resolve = {
        article: ($q, $http, $stateParams) => {
            return $q(resolve => {
                $http.get(`/article/${$stateParams.id}`)
                    .success(article => resolve(article));
            });
        }
    };

    module.filter('brlines', function() {
        return function(text) {
            return text.split(/\n/g);
        };
    });

    // Route configuration
    module.config($stateProvider => {
        $stateProvider.state(namespace, {
            url: `/${namespace}/:id`,
            template: template,
            controller: Ctrl,
            controllerAs: 'ctrl',
            resolve: resolve
        });
    });
}());