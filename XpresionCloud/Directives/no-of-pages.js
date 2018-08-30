(function () {
    'use strict';
    app.directive('itemNo', PageNo);
    function PageNo() {
        var pageTamplate = '<div class="btn-group" uib-dropdown>' + '<label class="btn btn-sm " ng-click="resetPage()" ng-class="{\'btn-primary\':ngModel==pages[0],\'btn-danger\':ngModel!=pages[0]}">{{ngModel==pages[0]?\'Items\':\'Reset\'}}</label>' + '<select ng-options="page for page in pages" ng-model="ngModel" ng-init="ngModel=pages[0]"></select>' + '</div>';
        var directive = {
            restrict: 'EA',
            template: pageTamplate,
            replace: true,
            scope: {
                ngModel: "=",
            },
            controller: function ($scope, $element) {
                $scope.label = "Pages"
                $scope.pages = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
                $scope.resetPage = function () {
                    $scope.ngModel = $scope.pages[0];
                    $scope.label = "Pages";
                }
            },
        }

        return directive;
    }
})()