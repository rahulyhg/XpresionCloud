
app.controller('zoneController', ["$rootScope","$scope", "$http", "$window", "$filter", "$timeout", "toaster", "SweetAlert", "cfpLoadingBar", "Session",
    function ($rootScope,$scope, $http, $window, $filter, $timeout, toaster, SweetAlert, cfpLoadingBar, Session) {
    
        $scope.currentPage = 1; // Table currentPage
        $scope.pageSize = 10; // Table pageSize
        $scope.pgNumSize = 5; // Pagination pgNumSize
        $scope.maxSize = $scope.app.isMobile?2:5;
        $scope.searchData = [];
        $scope.checked_fields = [];
        $scope.ldloading = {};
        $scope.search = {};
        $scope.sortType = '';
        $scope.sortReverse = true;

        $scope.init = function (panel) {
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@ZoneCode': '',
                        '@ZoneName': '',
                        '@Log_User': 'DEL001',
                        '@crud': 'R'
                    }
                }),
                'proc': 'Zonemast_Crud'
            })
            $http.post('/App/getData', param).then(function (response) {
                var data = response.data;
                $scope.searchData = data;
                $scope.filtered = data;
                $scope.total = data.length;
                if (panel) panel.removeSpinner();
            })
        }

        $scope.init();

        $scope.excelExport = function (style) {
            
            $scope.ldloading[style.replace('-', '_')] = true;
            var param = JSON.stringify({ data: angular.toJson($scope.searchData), name:'Export.xlsx' })

            $http.post('/App/exportExcel', param).then(function (response) {
                var data = response.data;
                window.open('/App/Download?fileGuid=' + data.FileGuid + '&fileName=' + data.FileName + '', "_blank");
                $scope.ldloading[style.replace('-', '_')] = false;
            })
        };

        $scope.partExport = function (style) {
            $scope.ldloading[style.replace('-', '_')] = true;
            
            var param = JSON.stringify({
                data: angular.toJson(filter($scope.checked_fields)),
                name: 'Excel.xlsx'
            });
            $http.post('/App/exportExcel', param).then(function (response) {
                var data = response.data;
                window.open('/App/Download?fileGuid=' + data.FileGuid + '&fileName=' + data.FileName + '',"_blank");
                $scope.ldloading[style.replace('-', '_')] = false;
                $scope.checked_fields = [];
            })
        }

        $scope.delete = function (v) {
            var MZoneCode;
            if (Array.isArray(v)) {
                MZoneCode = getCode(v);
            }
            else {
                MZoneCode = v;
            }
            
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@ZoneCode': '',
                        '@ZoneName': '',
                        '@Log_User': 'DEL001',
                        '@MZoneCode':MZoneCode,
                        '@crud': 'MD'
                    }
                }),
                'proc': 'Zonemast_Crud'
            })
            
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover once you delete!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, Cancel',
                closeOnConfirm: true,
                closeOnCancel:true,
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.post('/App/getData', param).then(function (response) {
                        var data = response.data;
                        if (data.length > 0) {
                            if (data[0].hasOwnProperty("Status")) {
                                if (data[0].Status == 0) {
                                    toast('Success', data[0].Message, 'success');
                                    $scope.init();
                                    $scope.checked_fields = [];
                                } else {
                                    toast('Error', data[0].Message, 'error');
                                }
                            }
                        }
                    })
                }
            })
        }

        $scope.add = function () {
            $scope.reset();
            $scope.table = false;
        }

        $scope.edit = function (v) {
            $scope.isEdit = true;
            $scope.table = false;

            $scope.zoneCode = v.ZoneCode;
            $scope.zoneName = v.ZoneName;
        }

        $scope.save = function () {
            var type;
            if ($scope.isEdit)
                type = 'U';
            else
                type = 'C';
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@ZoneCode': $scope.zoneCode,
                        '@ZoneName': $scope.zoneName,
                        '@Log_User': 'DEL001',
                        '@crud': type
                    }
                }),
                'proc': 'Zonemast_Crud'
            })
            cfpLoadingBar.start();
            $http.post('/App/getData', param).then(function (response) {
                cfpLoadingBar.complete();
                var data = response.data;
                if (data.length > 0) {
                    if (data[0].hasOwnProperty("Status")) {
                        if (data[0].Status == 0) {
                            toast('Success', data[0].Message, 'success');
                            $scope.init();
                            $scope.reset();
                        } else {
                            toast('Error', data[0].Message, 'error');
                        }
                    } else {
                        toast('Success', 'Record Inserted successfully', 'success');
                        $scope.init();
                        $scope.cancel();
                    }
                } else {
                    toast('Success', 'Record Inserted successfully', 'success');
                    $scope.init();
                    $scope.cancel();
                }
            });
        }

        $scope.reset = function (form) {
            $scope.zoneCode = '';
            $scope.zoneName = '';
            if(form) form.$setPristine(true);
            $scope.isEdit = false;
        }

        $scope.cancel = function (form) {
            $scope.zoneCode = '';
            $scope.zoneName = '';
            if (form) form.$setPristine(true);
            $scope.isEdit = false;
            $scope.table = true;
        }

        var filter = function (v) {
            var data = [];
            angular.forEach(v, function (v) {
                var d = $scope.searchData[v];
                data.push(d);

            })
            return data;
        }

        var getCode = function(v){
            var data = '';
            angular.forEach(v, function (v) {
                var d = $scope.searchData[v];
                data += d.ZoneCode + ',';
            })
            return data.substring(0,data.length-1);
        }


        $(document).on('panel-refresh', '.panel', function (e, panel) {

            // perform any action when a .panel triggers a the refresh event
            $scope.init(panel);

        });

        $scope.updateFilter = function () {
            $scope.filtered = $filter('filter')($scope.searchData, $scope.forms);
            $scope.currentPage = 1;
        }

        $scope.sortBy = function (v) {
            $scope.sortType = v;
            $scope.sortReverse = ($scope.sortType===v)?!$scope.sortReverse:false;
        }

        $scope.indexOfItem = function (v) {
            return $scope.searchData.indexOf(v)
        }
}]);

