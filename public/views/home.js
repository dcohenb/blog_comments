'use strict';

'use strict';

(function () {
    const namespace = 'home';
    const module = angular.module('app');

    const template = `
        <section>
            <h2>Articles</h2>
            <ul class="articles">
                <li ng-repeat="article in ctrl.articles">
                    <a ui-sref="article({id:article._id})">
                        <h4>{{article.title}}</h4>
                    </a>
                </li>
            </ul>
        </section>
    `;

    const Ctrl = function (articles) {
        let ctrl = this;

        ctrl.articles = articles;
    };

    const resolve = {
        articles: ($q, $http) => {
            return $q(resolve => {
                $http.get('/articles').success(articles => resolve(articles));
            });
        }
    };

    // Route configuration
    module.config($stateProvider => {
        $stateProvider.state(namespace, {
            url: `/`,
            template: template,
            controller: Ctrl,
            controllerAs: 'ctrl',
            resolve: resolve
        });
    });
}());