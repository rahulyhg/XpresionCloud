app.controller('VendorMaster', ['$rootScope', '$scope', '$timeout', '$http', '$window', '$timeout', '$filter', 'Session', 'focus','cfpLoadingBar',
function ($rootScope, $scope, $timeout, $http, $window, $timeout, $filter, Session, focus, cfpLoadingBar) {
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
    $scope.modes = [{ Id: 'O', Name: 'OBC' }, { Id: 'D', Name: 'Delivery' }, { Id: 'V', Name: 'Direct' }]
    $scope.init = function (panel) {
        var param = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    '@VENDOR_CODE': '',
                    '@VENDOR_NAME': '',
                    '@VENCONT_PERSON': '',
                    '@VENDOR_ADD1': '',
                    '@VENDOR_ADD2': '',
                    '@VENDOR_ADD3': '',
                    '@VENDOR_ADD4': '',
                    '@VENDOR_PIN': '',
                    '@VENDOR_TEL1': '',
                    '@VENDOR_TEL2': '',
                    '@VENDOR_FAX': '',
                    '@VENDOR_MOBILE': '',
                    '@VENDOR_EMAIL': '',
                    '@Vendor': '0',
                    '@OBC': '0',
                    '@Vendor_Direct': '0',
                    '@Currency': '',
                    '@Vendor_Web': '',
                    '@Log_User': '',
                    '@OrgCode': '',
                    '@DelvAlert': '0',
                    '@ZoneRate': '0',
                    '@FuelVendCode': '',
                    '@globe': '0',
                    '@Ship_Zip': '',
                    '@GSTNo': '',
                    '@crud': 'R1'
                }
            }),
            'proc': 'VendorMast_Crud'
        })
        $http.post('/App/getData', param).then(function (response) {
            var data = response.data;
            console.log(data);
            $scope.searchData = data;
            $scope.filtered = data;
            $scope.total = data.length;
            if (panel) panel.removeSpinner();
        })


        var param1 = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    
                }
                
            }),
            'proc': 'CurrencyUnique_Search'
        })
        $http.post('/App/getData', param1).then(function (response) {
            var data = response.data;
            console.log(data);
            $scope.currencys = data;
            //$scope.filtered = data;
            //$scope.total = data.length;
            if (panel) panel.removeSpinner();
        })
    }

    $scope.init();

    $scope.add = function () {
       // $scope.reset();
        $scope.table = false;
    }

    $scope.reset = function (form) {
        $scope.vendCode = '';
        $scope.vendName = '';
        $scope.contactPerson = '';
        $scope.address1 = '';
        $scope.address2 = '';
        $scope.address3 = '';
        $scope.address4 = '';
        $scope.AvendName = '';
        $scope.AvendCode = '';
        $scope.gstno = '';
        $scope.pin = '';
        $scope.telephone1 = '';
        $scope.telephone2 = '';
        $scope.fax = '';
        $scope.emailid = '';
        $scope.mobile = '';
        $scope.website = '';
        $scope.OrgCode = '';
        $scope.OrgName = '';

        if (form) form.$setPristine(true);
        $scope.isEdit = false;
    }

    $scope.save = function () {
        console.log('save click');
        var type;
        if ($scope.isEdit)
            type = 'U';
        else
            type = 'C';

        var vendormode=false;
        var obcmode =false;
        var direct = false;
        var delvalert = false;
        var zoneRate = false;
        var mGlobe = "0";

        if ($scope.web_mode == "O")
        {
            obcmode = true;
        }
        else if ($scope.web_mode == "V")
        {
            direct = true;
        }
        else if ($scope.web_mode == "D")
        {
            vendormode = true;
        }
        var param = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    '@VENDOR_CODE': $scope.vendCode,
                    '@VENDOR_NAME': $scope.vendName,
                    '@VENCONT_PERSON': $scope.contactPerson,
                    '@VENDOR_ADD1': $scope.address1,
                    '@VENDOR_ADD2': $scope.address2,
                    '@VENDOR_ADD3': $scope.address3,
                    '@VENDOR_ADD4': $scope.address4,
                    '@VENDOR_PIN': $scope.pin,
                    '@VENDOR_TEL1': $scope.telephone1,
                    '@VENDOR_TEL2': $scope.telephone2,
                    '@VENDOR_FAX': $scope.fax,
                    '@VENDOR_MOBILE': $scope.mobile,
                    '@VENDOR_EMAIL': $scope.emailid,
                    '@Vendor': vendormode,
                    '@OBC': obcmode,
                    '@Vendor_Direct': direct,
                    '@Currency': $scope.web_currency,
                    '@Vendor_Web': $scope.AvendCode,
                    '@Log_User': $scope.session.user,
                    '@OrgCode': $scope.OrgCode,
                    '@DelvAlert': delvalert,
                    '@ZoneRate': zoneRate,
                    '@FuelVendCode': '0',
                    '@globe': mGlobe,
                    '@Ship_Zip': '',
                    '@GSTNo': '',                    
                    '@crud': type
                }
            }),
            'proc': 'VendorMast_Crud'
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


    $scope.cancel = function (form) {
        //$scope.zoneCode = '';
        //$scope.zoneName = '';
        $scope.vendCode = '';
        $scope.vendName = '';
        $scope.contactPerson = '';
        $scope.address1 = '';
        $scope.address2 = '';
        $scope.address3 = '';
        $scope.address4 = '';
        $scope.AvendName = '';
        $scope.AvendCode = '';
        $scope.gstno = '';
        $scope.pin = '';
        $scope.telephone1 = '';
        $scope.telephone2 = '';
        $scope.fax = '';
        $scope.emailid = '';
        $scope.mobile = '';
        $scope.website = '';
        $scope.OrgCode = '';
        $scope.OrgName = '';
        if (form) form.$setPristine(true);
        $scope.isEdit = false;
        $scope.table = true;
    }

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