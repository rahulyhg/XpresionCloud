(function () {
    'use strict';
    app.directive('exporter', ['$http', exporter]);
    function exporter($http) {
        var exportTamplate = '<div class="btn-group" uib-dropdown>' +
                '<a ladda="ldloading.slide_up" class="btn btn-sm btn-danger" data-style="slide-up" ng-click="excelExport(\'slide-up\')">Export </a>' +
                '<button type="button" class="btn btn-danger dropdown-toggle btn-sm" uib-dropdown-toggle>' +
                    '<span class="caret"></span>' +
                    '<span class="sr-only">Split button!</span>'+
                '</button>' +
                '<ul class="dropdown-menu" role="menu">' +
                    '<li><a href="javascript:void(0)" ng-click="excelExport(\'slide-up\')">Excel</a></li>'+
                    '<li><a href="javascript:void(0)">PDF</a></li>' +
                    '<li><a href="javascript:void(0)">Print</a></li>'+
                '</ul>'+
            '</div>';
                var directive = {
                    restrict: 'EA',
                    template: exportTamplate,
                    replace: true,
                    scope: {
                        data: "=",
                        fileName: "@",
                    },
                    controller: function ($scope, $element) {
                        $scope.ldloading = {};
                        $scope.excelExport = function (style) {
                            $scope.ldloading[style.replace('-', '_')] = true;
                            var param = JSON.stringify({ data: angular.toJson($scope.data), name: $scope.fileName });
                            $http.post('/App/exportExcel', param).then(function (response) {
                                var data = response.data;
                                window.open('/App/Download?fileGuid=' + data.FileGuid + '&fileName=' + data.FileName + '', "_blank");
                                $scope.ldloading[style.replace('-', '_')] = false;
                            })
                        }
                    }
                }
                return directive;
    }
})();