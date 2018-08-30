app.controller('branchController', ['$rootScope', '$scope', '$timeout', '$http', '$window', '$timeout', '$filter', 'Session', 'focus', "cfpLoadingBar", "SweetAlert",
function ($rootScope, $scope, $timeout, $http, $window, $timeout, $filter, Session, focus, cfpLoadingBar, SweetAlert) {
    //CHANGE AS PER YOUR NEED
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

    // START CODING FROM HERE
    $scope.Search = function (type) {
        //console.log(type);
        $scope.deststype = type;
        var param = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    '@branchcode': '',
                    '@branchname': '',
                    '@country': '',
                    '@zone': '',
                    '@type': type,
                    '@Log_User': $scope.session.user,
                    '@branch_mani': '',
                    '@main_branch': '',
                    '@org_code': '',
                    '@readtype': 'des',
                    '@crud': 'R',
                    '@State': '',
                    '@service': ''
                }
            }),
            'proc': 'Destinationmast_CrudNew'
        })
        $http.post('/App/getData', param).then(function (response) {
            var data = response.data;
            //console.log(data);
            $scope.searchData = data;
            $scope.filtered = data;
            $scope.total = data.length;

        })
        //console.log($scope.session.comp_code);
    }
    $scope.init = function (panel) {
        $scope.Search('D');
        if (panel) panel.removeSpinner();
    }

    $scope.init();


    var filter = function (v) {
        var data = [];
        angular.forEach(v, function (v) {
            var d = $scope.searchData[v];
            data.push(d);

        })
        return data;
    }
    $scope.add = function () {
        $scope.reset();
        $scope.table = false;
        $scope.ADD = true;

        if ($scope.deststype == 'L') {
            $scope.statecode = 'MH';
            $scope.statename = 'Maharastra';
        }
    }
    $scope.reset = function (form) {
        $scope.countCode = '';
        $scope.countName = '';
        $scope.unit = '';
        $scope.currency = '';
        if (form) form.$setPristine(true);
        $scope.isEdit = false;
    }

    $scope.cancel = function (form) {
        $scope.countCode = '';
        $scope.countName = '';
        $scope.unit = '';
        $scope.currency = '';
        if (form) form.$setPristine(true);
        $scope.isEdit = false;
        $scope.table = true;
        $scope.ADD = false;
    }


    $scope.save = function () {
        var type;
        if ($scope.isEdit)
            type = 'U';
        else
            type = 'C';

        var state = '';
        //console.log($scope.deststype);
        //console.log($scope.statecode);
        //console.log($scope.statename);
        //console.log(state);

        //console.log($scope.ZoneCode);

        //console.log($scope.countrycode);

        if ($scope.deststype != "I")
            state = $scope.statecode;
        else
            state = '';

        //console.log(state);
        var Country = '';
        //console.log(Country);
        if ($scope.deststype == "I")
            Country = $scope.countrycode;
        else
            Country = 'IN';

        //console.log(Country);
        var param = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    '@branchcode': $scope.BranchCode,
                    '@branchname': $scope.BranchName,
                    '@country': Country,
                    '@zone': $scope.ZoneCode,
                    '@type': $scope.deststype,
                    '@Log_User': $scope.session.user,
                    '@branch_mani': $scope.BranchManifestCode,
                    '@main_branch': $scope.MainBranchCode,
                    '@org_code': '',
                    '@readtype': '',
                    '@crud': type,
                    '@State': state,
                    '@service': $scope.ServiceTypeCode,
                    '@Diplomate': '0',
                    '@Email': $scope.EmailID,
                    '@MobileNo': $scope.MobileNo
                }
            }),
            'proc': 'Destinationmast_CrudNew'
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


    $scope.edit = function (v) {

        var access = false;
        var param = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    '@User': $scope.session.user,
                    '@MenuName': 'mnuMastRemote'
                }
            }),
            'proc': 'GetUserMenuAccess'
        })
        $http.post('/App/getData', param).then(function (response) {
            var data = response.data;
            console.log(data[0].AccTODelete);
            access = data[0].AccTOModify;
            //if (access) {
            //    toast('Error', 'No Access To Delete..!', 'success');
            //    return false;
            //}
            //$scope.searchData = data;
            //$scope.filtered = data;
            //$scope.total = data.length;
            //if (panel) panel.removeSpinner();
        })
        if (access) {
            $scope.isEdit = true;
            $scope.table = false;
            $scope.ADD = true;
            //console.log(v);
            $scope.BranchCode = v.BRANCH_CODE;

            $scope.statecode = v.State_Code;
            $scope.statename = v.state_name;

            $scope.countrycode = v.Country_Code;
            $scope.countryname = v.Country_Name;

            $scope.BranchName = v.BRANCH_NAME;
            $scope.EmailID = v.BRANCH_TELEX;
            $scope.ZoneCode = v.ZONECODE;
            $scope.ZoneName = v.ZoneName;
            $scope.MobileNo = v.branch_mobile;
            $scope.ServiceTypeCode = v.SrNo;
            $scope.ServiceTypeName = v.Service_Type;
            $scope.MainBranchCode = v.Main_Branch;
            $scope.MainBranchName = v.ManiBranchName;
            $scope.BranchManifestCode = v.BRANCH_MANIFEST;
            $scope.BranchManifestName = v.BranchManifestName;
            //$scope.countCode = v.COUNTRY_CODE;
            //$scope.countName = v.COUNTRY_Name;
            //$scope.unit = v.weight_unit;
            //$scope.currency = v.currency_code;
        }
        else {
            toast('Error', 'No Access To Modify..!', 'error');
        }
    }

    //$scope.delete = function (v) {
    //    console.log(v);
    //}
    $scope.delete = function (v) {
        var access = false;
        var param = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    '@User': $scope.session.user,
                    '@MenuName': 'mnuMastRemote'
                }
            }),
            'proc': 'GetUserMenuAccess'
        })
        $http.post('/App/getData', param).then(function (response) {
            var data = response.data;
            console.log(data[0].AccTODelete);
            access = data[0].AccTODelete;
            //if (access) {
            //    toast('Error', 'No Access To Delete..!', 'success');
            //    return false;
            //}
            //$scope.searchData = data;
            //$scope.filtered = data;
            //$scope.total = data.length;
            //if (panel) panel.removeSpinner();
        })
        if (access) {
            var MCountCode;
            if (Array.isArray(v)) {
                MCountCode = getCode(v);
            }
            else {
                MCountCode = v;
            }

            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        //'@CountryCode': '',
                        //'@CountryName': '',
                        //'@Log_User': 'DEL001',
                        //'@MCountryCode': MCountCode,
                        //'@crud': 'MD'
                        '@branchcode': '',
                        '@branchname': '',
                        '@country': '',
                        '@zone': '',
                        '@type': '',
                        '@Log_User': $scope.session.user,
                        '@branch_mani': '',
                        '@main_branch': '',
                        '@org_code': '',
                        '@readtype': '',
                        '@crud': 'MD',
                        '@State': '',
                        '@service': '',
                        '@MCountryCode': MCountCode,
                    }
                }),
                'proc': 'Destinationmast_CrudNew'
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
                console.log(MCountCode);
                console.log(param);
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
                    });
                }
            });
        }
        else {
            toast('Error', 'No Access To Delete..!', 'error');
        }
    }

    var getCode = function (v) {
        var data = '';
        angular.forEach(v, function (v) {
            var d = $scope.searchData[v];
            data += d.BRANCH_CODE + ',';
        })
        return data.substring(0, data.length - 1);
    }
    $scope.sortBy = function (v) {
        $scope.sortType = v;
        $scope.sortReverse = ($scope.sortType === v) ? !$scope.sortReverse : false;
    }

    $scope.indexOfItem = function (v) {
        return $scope.searchData.indexOf(v);
    }

    $scope.updateFilter = function () {
        $scope.filtered = $filter('filter')($scope.searchData, $scope.search);
        $scope.currentPage = 1;
    }

    $(document).on('panel-refresh', '.panel', function (e, panel) {

        // perform any action when a .panel triggers a the refresh event
        $scope.init(panel);

    });


}]);