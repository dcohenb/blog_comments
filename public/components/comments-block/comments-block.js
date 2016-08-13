'use strict';

(function () {
    const module = angular.module('app');

    module.component('commentsBlock', {
        bindings: {
            articleId: '='
        },
        template: `
            <form class="add-comment"
                ng-submit="ctrl.submitComment(comment)"
                ng-model="ctrl.newComment"
                ng-disabled="ctrl.postingComment">
                <input type="email" placeholder="Email" ng-model="ctrl.newComment.email">
                <textarea placeholder="Message" ng-model="ctrl.newComment.comment"></textarea>
                <button class="submit">{{ctrl.postingComment ? 'Posting...' : 'Submit'}}</button>
            </form>
            <div class="comments">
                <div class="filter">
                    <input type="text"
                        ng-model="ctrl.filter"
                        ng-model-options="{debounce:500}"
                        ng-change="ctrl.filterComments()"
                        placeholder="Filter">
                    <i class="icon ion-search"></i>
                </div>
                
                <div class="message" ng-if="!ctrl.loading && ctrl.filter && ctrl.comments.length === 0">
                    <i class="ion-ios-paper-outline"></i>
                    No comments found
                </div>
                <div class="message" ng-if="!ctrl.loading && !ctrl.filter && ctrl.comments.length === 0">
                    <i class="ion-ios-paper-outline"></i>
                    No comments were posted yet, You can be the first!
                </div>
                <div class="comment" ng-repeat="comment in ctrl.comments">
                    <img class="avatar" ng-src="https://www.gravatar.com/avatar/{{comment.email_hash}}?s=60&d=mm" alt="">
                    <div class="info">
                        <h4>{{comment.email}}</h4>
                        <p>{{comment.comment}}</p>
                    </div>
                </div>
                <div class="message" ng-if="ctrl.loading">
                    <i class="ion-load-c"></i>
                    Loading
                </div>
                <button ng-if="!ctrl.loading && ctrl.nextComments"
                    class="load-more-comments"
                    ng-click="ctrl.loadComments(ctrl.nextComments)">
                    <i class="ion-chevron-down"></i>
                    Load more comments...
                </button>
            </div>
        `,
        controller: function ($http) {
            let ctrl = this;

            ctrl.comments = [];

            ctrl.loadComments = (url) => {
                ctrl.loading = true;
                url = url || `/article/${ctrl.articleId}/comments`;
                return $http.get(url)
                    .success(response => {
                        ctrl.loading = false;
                        ctrl.nextComments = response.next;
                        ctrl.comments = ctrl.comments.concat(response.comments);
                    });
            };

            ctrl.filterComments = () => {
                let url = `/article/${ctrl.articleId}/comments?filter=${ctrl.filter}`;
                ctrl.comments = [];
                ctrl.loadComments(url);
            };

            ctrl.submitComment = () => {
                ctrl.postingComment = true;
                $http.post(`/article/${ctrl.articleId}/comments`, ctrl.newComment)
                    .success(comment => {
                        ctrl.postingComment = false;
                        ctrl.comments.unshift(comment);
                        ctrl.newComment = {};
                    });
            };

            ctrl.loadComments();
        },
        controllerAs: 'ctrl'
    });
}());