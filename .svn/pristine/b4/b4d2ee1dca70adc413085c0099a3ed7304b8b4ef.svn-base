(function () {
    'use strict';
    app.directive('tableHead', ['$compile', '$http', tableHead]);
    function tableHead($compile, $http) {
        var tamplate = '<tr ng-repeat="(key,val) in headData | limitTo:1" align="left" class="heading" ng-if="!filter">'
        + ' <th><a href="#" class="btn btn-transparent btn-xs tooltips" tooltip-placement="top" uib-tooltip="Filter" ng-click="filterToggle()"><i class="fa fa-filter fa fa-white"></i></a></th>'
        + ' <th class="column-title" ng-repeat="(k,v) in val | limitTo:1">'
        + '     <a href="#" ng-click="sortBy(k)">{{parseName(k)}}</a>'
        + '     <span ng-show="sortType==\'{{k}}\'" class="fa sortorder" ng-class="{reverse:sortReverse}"></span>'
        + ' </th>'
        + ' <th class="column-title" ng-hide="boxList.length>0" ng-if="isAction">Action</th>'
        + '</tr>'

        + '<tr ng-repeat="(key,val) in headData | limitTo:1" align="left" class="heading" ng-if="filter">'
        + '    <th>'
        + '        <a href="#" class="btn btn-transparent btn-xs tooltips" tooltip-placement="top" uib-tooltip="Close" ng-click="filterToggle()"><i class="fa fa-times fa fa-white"></i></a>'
        + '        <a href="#" class="btn btn-transparent btn-xs tooltips" tooltip-placement="top" uib-tooltip="Clear Filter" ng-click="clearFilter()"><i class="fa fa-undo fa fa-white"></i></a>'
        + '    </th>'
        + '    <th class="column-title" ng-repeat="(k,v) in val | limitTo:1">'
        + '        <input type="text" ng-model="search[k]" placeholder="{{parseName(k)}}" ng-change="updateFilter()" />'
        + '    </th>'
        + '    <th class="column-title" ng-hide="checked_fields.length>0"></th>'
        + '</tr>'

        + '<tr ng-show="boxList.length>0">'
        + '    <th class="fix-width">'
        + '        <a href="#" class="btn btn-transparent btn-xs tooltips" tooltip-placement="top" uib-tooltip="Clear" ng-click="boxList = []"><i class="fa fa-times fa fa-white"></i></a>'
        + '    </th>'
        + '    <th colspan="{{data.length}}">'
        + '        <div class="btn-group" uib-dropdown>'
        + '            <a ladda="loading.red" class="btn btn-sm btn-default no-border" data-style="slide-right" data-spinner-color="#ff0000">Bulk Action ({{boxList.length}} Record(s) Selected) </a>'
        + '            <button type="button" class="btn btn-default dropdown-toggle btn-sm no-border" uib-dropdown-toggle>'
        + '                <span class="caret"></span>'
        + '                <span class="sr-only">Split button!</span>'
        + '            </button>'
        + '            <ul class="dropdown-menu" role="menu">'
        + '                <li ng-show="isDelete">'
        + '                    <a href="javascript:void(0)" ng-click="delete()">Delete</a>'
        + '                </li>'
        + '                <li>'
        + '                    <a href="javascript:void(0)" ng-click="export(\'red\')">Export</a>'
        + '                </li>'
        + '            </ul>'
        + '        </div>'
        + '    </th>'
        + '</tr>';
        var directive = {
            restrct: 'EA',
            template: tamplate,
            require:['data','loading'],
            scope: {
                data: '=',
                boxList: '=',
                delete: '&',
                
                loading: '=',
                search: '=',
                updateFilter: '&',
                isAction: '@',
                sortType: '=',
                sortReverse: '=',
                hideColumn: '=',
                showColumn: '='
            },
            controller: function ($scope, $element) {
                $scope.isAction = $scope.isAction || false;
                $scope.filter = false;
                $scope.sortReverse = true;
                $scope.headData = null;
                $scope.isDelete = $scope.delete ? true : false;
                
                $scope.filterToggle = function () {
                    $scope.filter = !$scope.filter;
                    if (!$scope.filter)
                        $scope.clearFilter();
                }
                $scope.clearFilter = function () {
                    $scope.search = {};
                    setTimeout(function () {
                        $scope.updateFilter();
                    }, 100);
                }

                $scope.sortBy = function (v) {
                    $scope.sortType = v;
                    $scope.sortReverse = ($scope.sortType === v) ? !$scope.sortReverse : false;
                }
                $scope.$watch('data', function () {
                    var d = JSON.stringify($scope.data);
                    $scope.headData = JSON.parse(d);
                    if ($scope.hideColumn) {
                        for (var i = 0; i < $scope.hideColumn.length; i++) {
                            for (var k = 0; k < $scope.headData.length; k++) {
                                delete $scope.headData[k][$scope.hideColumn[i]];
                            }
                        }
                    }

                    if ($scope.showColumn) {
                        var dd = JSON.parse(JSON.stringify($scope.data));
                        var data = [];
                        for (var i = 0; i < $scope.showColumn.length; i++) {
                            for (var k = 0; k < dd.length; k++) {
                                data.add( )
                            }
                        }
                    }
                })
                
                $scope.parseName = function (v) {
                    return v.replace('_', ' ');
                }

                $scope.export = function (style) {
                    $scope.loading[style.replace('-', '_')] = true;

                    var param = JSON.stringify({
                        data: angular.toJson(filter($scope.boxList)),
                        name: 'Excel.xlsx'
                    });
                    $http.post('/App/exportExcel', param).then(function (response) {
                        var data = response.data;
                        window.open('/App/Download?fileGuid=' + data.FileGuid + '&fileName=' + data.FileName + '', "_blank");
                        $scope.loading[style.replace('-', '_')] = false;
                        $scope.boxList = [];
                    })
                }

                var filter = function (v) {
                    var data = [];
                    angular.forEach(v, function (v) {
                        var d = $scope.data[v];
                        data.push(d);

                    })
                    return data;
                }
            }
        }
        return directive;
    }
})()