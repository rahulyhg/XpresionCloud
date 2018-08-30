(function () {
    'use strict';
    app.directive('inputValidate', inputValidate);
    function inputValidate() {
        var inputTamplate = '<div class="form-group" ng-class="{\'has-error\':formName.inputId.$dirty && formName.inputId.$invalid || formName.inputId.$invalid && formName.$submitted, \'has-success\':formName.inputId.$valid}">'
        + '<label class="control-label">{{labelName}}<span class="symbol required"></span></label>'
        + '<input type="text" maxlength="{{maxLength}}" placeholder="{{placeHolder}}" class="form-control" name="{{inputId}}" ng-model="ngModel" ng-required="ngRequired" />'
        + '<span class="error text-small block" ng-if="formName.inputId.$dirty && formName.inputId.$invalid || formName.inputId.$invalid && formName.$submitted">{{error||\'This field is required\'}}</span>'
        + '</div>';

        var directive = {
            restrict: 'E',
            template: inputTamplate,
            replace: true,
            scope: {
                formName: "@",
                inputId: "@",
                labelName: "@",
                placeHolder: "@",
                error:"@",
                ngModel: "=",
                maxLength: "@",
                ngRequired: "@",
            },
            link: function ($scope, elem, attrs) {
                console.log($scope.formName.$scope.inputId.$valid);
            }
        }
        return directive;
    }
})()