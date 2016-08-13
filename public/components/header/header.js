'use strict';

(function () {
    const module = angular.module('app');

    module.component('header', {
        template: `
            <h2>Blog Comments</h2>
            <nav>
                <a ui-sref="home">All Articles</a>
            </nav>
        `
    });
}());