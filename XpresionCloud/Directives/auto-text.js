(function () {
    'use strict';
    app.directive('autoText', ['$http', autoComplete]);
    function autoComplete($http) {
        var viewTemplate = '<div class="input-group">'
        + '	<input type="text" name="{{name}}" autocomplete="off" class="{{cssClass}}"  placeholder="{{placeholder}}" ng-model="nameModel" uib-typeahead="text for text in autoText($viewValue)" typeahead-on-select="onSelect($item,$event)" typeahead-is-open="isTypeOpen" ng-blur="blur()" ng-change="nameChange()" id={{ngId}} ng-required="ngRequired">'
        + '	<span class="input-group-btn">'
        + '     <input type="text" class="{{cssClass}}" style="width: 55px; background: #2c2f3b !important; color: #fff !important; border: 1px; {{style}}" disabled ng-model="codeModel">'
        + '	</span>'
        + '</div>';
        var directive = {
            restrict: 'EA',
            template: viewTemplate,
            replace:true,
            scope: {
                name: '@',
                codeModel: '=',
                nameModel: '=',
                cssClass: '@',
                function: '@',
                ngRequired: '=',
                error: '@',
                placeholder: '@',
                ngId: '@',
                style: '@',
                contextKey:'@'
            },
            controller: function ($scope, $element) {
                $scope.autoText = function (v) {
                    var param = JSON.stringify({
                        'prefixText': v,
                        'count':20,
                        'contextKey': $scope.contextKey
                    })
                    return $http.post("/App/" + $scope.function, param).then(function (response) {
                        return response.data;
                    });
                }

                $scope.nameChange = function () {
                    $scope.codeModel = null;
                }

                $scope.onSelect = function (v, e) {
                    change();
                }

                var change = function () {
                    var text = $scope.nameModel;
                    if (text) {
                        if (text.indexOf('|') >= 0) {
                            var arr = text.split('|');
                            $scope.nameModel = arr[0].trim();
                            $scope.codeModel = arr[1].trim();
                        } else if (!$scope.codeModel) {
                            //toast('Error', $scope.error || '', 'error');
                            $scope.nameModel = '';
                        }
                    }
                }

                $scope.blur = function () {
                    var text = $scope.nameModel;
                    var code = $scope.codeModel;
                    if (!$scope.isTypeOpen && text && code) {

                    } else {
                        if (!$scope.isTypeOpen && text && !code) {
                            //toast('Error', $scope.error || '', 'error');
                            $scope.nameModel = '';
                        }
                    }
                }
            }
        }
        return directive;
    }
})()
