
app.controller('LocationController', ["$rootScope", "$scope", "$http", "$window", "$filter", "$timeout", "toaster", "SweetAlert", "cfpLoadingBar", "Session",
    function ($rootScope, $scope, $http, $window, $filter, $timeout, toaster, SweetAlert, cfpLoadingBar, Session) {

        $scope.currentPage = 1; // Table currentPage
        $scope.pageSize = 10; // Table pageSize
        $scope.pgNumSize = 5; // Pagination pgNumSize
        $scope.maxSize = $scope.app.isMobile ? 2 : 5;
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
                        '@Loc_Code': '',
                        '@orgin': '',
                        '@Loc_Name': '',
                        '@Log_User': '',
                        '@crud': 'R1',
                        '@lastinv': '0',
                        '@add1': '',
                        '@add2': '',
                        '@add3': '',
                        '@subname': '',
                        '@tel': '',
                        '@mail': '',
                        '@saleaccount': '',
                        '@Franchise': '0',
                        '@HUB': '0',
                        '@Billing': '0',
                        '@Mani_Hub': '0',
                        '@Mani_Int_cent': '0',
                        '@Mani_Oth_Hubs': '0',
                        '@Mani_Oth_cent': '0',
                        '@GSTNo': '',
                        '@state': ''
                    }
                }),
                'proc': 'Locnmast_Crud'
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
            var param = JSON.stringify({ data: angular.toJson($scope.searchData), name: 'Export.xlsx' })

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
                window.open('/App/Download?fileGuid=' + data.FileGuid + '&fileName=' + data.FileName + '', "_blank");
                $scope.ldloading[style.replace('-', '_')] = false;
                $scope.checked_fields = [];
            })
        }

        $scope.delete = function (v) {
            var MLocCode;
            if (Array.isArray(v)) {
                MLocCode = getCode(v);
            }
            else {
                MLocCode = v;
            }

            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@Loc_Code': '',
                        '@orgin': '',
                        '@Loc_Name': '',
                        '@Log_User': $scope.session.user,
                        '@crud': 'MD',
                        '@lastinv': '0',
                        '@add1': '',
                        '@add2': '',
                        '@add3': '',
                        '@subname': '',
                        '@tel': '',
                        '@mail': '',
                        '@saleaccount': '',
                        '@Franchise': '0',
                        '@HUB': '0',
                        '@Billing': '0',
                        '@Mani_Hub': '0',
                        '@Mani_Int_cent': '0',
                        '@Mani_Oth_Hubs': '0',
                        '@Mani_Oth_cent': '0',
                        '@GSTNo': '',
                        '@state': '',
                        '@MLocCode': MLocCode,
                    }
                }),
                'proc': 'Locnmast_Crud'
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
                closeOnCancel: true,
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
            //$scope.zoneCode = v.ZoneCode;
            //$scope.zoneName = v.ZoneName;
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@Loc_Code': v,
                        '@orgin': '',
                        '@Loc_Name': '',
                        '@Log_User': '',
                        '@crud': 'R',
                        '@lastinv': '0',
                        '@add1': '',
                        '@add2': '',
                        '@add3': '',
                        '@subname': '',
                        '@tel': '',
                        '@mail': '',
                        '@saleaccount': '',
                        '@Franchise': '0',
                        '@HUB': '0',
                        '@Billing': '0',
                        '@Mani_Hub': '0',
                        '@Mani_Int_cent': '0',
                        '@Mani_Oth_Hubs': '0',
                        '@Mani_Oth_cent': '0',
                        '@GSTNo': '',
                        '@state': ''
                    }
                }),
                'proc': 'Locnmast_Crud'
            })
            $http.post('/App/getData', param).then(function (response) {
                var data = response.data;
                //$scope.searchData = data;
                $scope.filtered = data;
                //$scope.total = data.length;
                //if (panel) panel.removeSpinner();
                $scope.locationCode = data[0].Loc_Code;
                $scope.branchCode = data[0].orgcode;
                $scope.branch = data[0].branch_name;
                $scope.locationName = data[0].Loc_Name;
                $scope.lastInv = data[0].Loc_LastInvNo;
                $scope.add1 = data[0].Loc_Add1;
                $scope.add2 = data[0].Loc_Add2;
                $scope.add3 = data[0].Loc_Add3;
                $scope.subname = data[0].Loc_SubName;
                $scope.Telphone = data[0].Loc_TelNo;
                $scope.email = data[0].Email;
                $scope.SalesAcc = data[0].Tally_Sales_Account;
                $scope.Franchise = data[0].Franchise;
                $scope.HUB = data[0].HUB;
                $scope.Billing = data[0].Billing;
                $scope.gstno = data[0].GSTNo;
                $scope.state = data[0].State_Code;
                $scope.StateName = data[0].State_Name;
                if (data[0].Mani_Hub == 1) {
                    $scope.HUBtype = 'I';
                }
                else if (data[0].Mani_Oth_Hubs == 1) {
                    $scope.HUBtype = 'O';
                }

                if (data[0].Mani_Int_cent == 1) {
                    $scope.CenterType = 'I';
                }
                else if (data[0].Mani_Oth_cent == 1) {
                    $scope.CenterType = 'O';
                }

                $scope.table = false;
            })
        }

        $scope.save = function () {
            var type;
            var Mani_Hub = 0; var Mani_Int_cent = 0; var Mani_Oth_Hubs = 0; var Mani_Oth_cent = 0;

            if ($scope.HUBtype == 'I')
            {
                Mani_Hub = 1;
                Mani_Oth_Hubs = 0;
            }
            else if ($scope.HUBtype == 'O') {
                Mani_Hub = 0;
                Mani_Oth_Hubs = 1;
            }

            if ($scope.CenterType == 'I') {
                Mani_Int_cent = 1;
                Mani_Oth_cent = 0;
            }
            else if ($scope.CenterType == 'O') {
                Mani_Int_cent = 0;
                Mani_Oth_cent = 1;
            }

            if ($scope.isEdit)
                type = 'U';
            else
                type = 'C';
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@Loc_Code': $scope.locationCode,
                        '@orgin': $scope.branchCode,
                        '@Loc_Name': isEmptyOrNull($scope.locationName) ? '' : $scope.locationName,
                        '@Log_User': $scope.session.user,
                        '@crud': type,
                        '@lastinv': isEmptyOrNull($scope.lastInv) ? '' : $scope.lastInv,
                        '@add1': isEmptyOrNull($scope.add1) ? '' : $scope.add1,
                        '@add2': isEmptyOrNull($scope.add2) ? '' : $scope.add2,
                        '@add3': isEmptyOrNull($scope.add3) ? '' : $scope.add3,
                        '@subname': isEmptyOrNull($scope.subname) ? '' : $scope.subname,
                        '@tel': isEmptyOrNull($scope.Telphone) ? '' : $scope.Telphone,
                        '@mail': isEmptyOrNull($scope.email) ? '' : $scope.email,
                        '@saleaccount': isEmptyOrNull($scope.SalesAcc) ? '' : $scope.SalesAcc,
                        '@Franchise': isEmptyOrNull($scope.Franchise) ? '0' : $scope.Franchise,
                        '@HUB': isEmptyOrNull($scope.HUB) ? '0' : $scope.HUB,
                        '@Billing': isEmptyOrNull($scope.Billing)? '0' : $scope.Billing,
                        '@Mani_Hub': Mani_Hub,
                        '@Mani_Int_cent': Mani_Int_cent,
                        '@Mani_Oth_Hubs': Mani_Oth_Hubs,
                        '@Mani_Oth_cent': Mani_Oth_cent,
                        '@GSTNo': $scope.gstno,
                        '@state': $scope.state
                        
                    }
                }),
                'proc': 'Locnmast_Crud'
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
            $scope.locationCode = '';
            $scope.branchCode = '';
            $scope.locationName = '';
            $scope.lastInv = '';
            $scope.add1 = '';
            $scope.add2 = '';
            $scope.add3 = '';
            $scope.subname = '';
            $scope.Telphone = '';
            $scope.email = '';
            $scope.SalesAcc = '';
            $scope.Franchise = '';
            $scope.HUB = '';
            $scope.Billing = '';
            $scope.gstno = '';
            $scope.state = '';
            $scope.StateName = '';
            if (form) form.$setPristine(true);
            $scope.isEdit = false;
        }

        var isEmptyOrNull = function (val) {
            return !val;
        }

        $scope.cancel = function (form) {
            $scope.locationCode='';
            $scope.branchCode='';
            $scope.locationName = '';
            $scope.lastInv = '';
            $scope.add1 = '';
            $scope.add2 = '';
            $scope.add3 = '';
            $scope.subname = '';
            $scope.Telphone = '';
            $scope.email = '';
            $scope.SalesAcc = '';
            $scope.Franchise = '';
            $scope.HUB = '';
            $scope.Billing = '';
            $scope.gstno = '';
            $scope.state = '';
            $scope.StateName = '';
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

        var getCode = function (v) {
            var data = '';
            angular.forEach(v, function (v) {
                var d = $scope.searchData[v];
                data += d.Loc_Code + ',';
            })
            return data.substring(0, data.length - 1);
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
            $scope.sortReverse = ($scope.sortType === v) ? !$scope.sortReverse : false;
        }

        $scope.indexOfItem = function (v) {
            return $scope.searchData.indexOf(v)
        }
    }]);

