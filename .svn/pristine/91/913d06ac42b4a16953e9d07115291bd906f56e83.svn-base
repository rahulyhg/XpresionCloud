app.controller('indentController', ['$rootScope', '$scope', '$timeout', '$http', '$window', '$timeout', '$filter', 'SweetAlert', 'cfpLoadingBar', 'Session','focus','$resource',
    function ($rootScope, $scope, $timeout, $http, $window, $timeout, $filter, SweetAlert, cfpLoadingBar, Session, focus, $resource) {
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
        $scope.hdnsrno = null;

        var init = function (panel) {
            $scope.table = true;
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@Sr_No': 0,
                        '@Customer_Code': 'n',
                        '@Indent_date': 'n',
                        '@Indent_No': 'n',
                        '@Indent_Exec': 'n',
                        '@Indent_Weight': 0,
                        '@Part_No': 'n',
                        '@Pcs': 0,
                        '@User_ID': 'n',
                        '@Crud':'R'
                    }
                }),
                'proc': 'IndentMasterCrud'
            });

            $http.post('/App/getData', param).then(function (response) {
                var data = response.data;
                $scope.searchData = data;
                $scope.filtered = data;
                $scope.total = data.length;
                if (panel) panel.removeSpinner();
            });
        }

        init();
        $scope.add = function () {
            $scope.table = false;
            $scope.Reset();
        }

        $scope.Reset = function () {
            $scope.Form.$setPristine();
            $scope.Form.$setUntouched();
            $scope.date = $filter('date')(new Date(), 'dd/MM/yyyy');
            $scope.custCode = "";
            $scope.custName = "";
            $scope.indentNo = "";
            $scope.executive = "";
            $scope.weight = "";
            $scope.pcs = "";
            $scope.part = "";
            $scope.pcs = "";
        }

        $scope.cancel = function () {
            $scope.tblDetails = false;
            $scope.table = true;
            $scope.Reset();
            $scope.isEdit = false;
        }

        $scope.saveDetails = function () {
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@Sr_No': 0,
                        '@Customer_Code': $scope.custCode,
                        '@Indent_date': $scope.date,
                        '@Indent_No': $scope.indentNo,
                        '@Indent_Exec': $scope.executive,
                        '@Indent_Weight': $scope.weight,
                        '@Part_No': $scope.part,
                        '@Pcs': $scope.pcs,
                        '@User_ID': 'DEL001',
                        '@Crud': 'C'
                    }
                }),
                'proc': 'IndentMasterCrud'
            });
            $http.post('/App/getData', param).then(function (response) {
                var data = response.data;
                if (data.length > 0) {
                    if (data[0].hasOwnProperty("Status")) {
                        if (data[0].Status == 0) {
                            toast('Success', data[0].Message, 'success');
                            init();
                        } else {
                            toast('Error', data[0].Message, 'error');
                        }
                    } else {
                        $scope.tblDetails = true;
                        $scope.details = data;
                        $scope.part = "";
                        $scope.pcs = "";
                        focus('part');
                        //init();
                    }
                }
            })
        }

        $scope.edit = function (e) {
            $scope.isEdit = true;
            var param = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@Sr_No': e,
                        '@Customer_Code': 'n',
                        '@Indent_date': 'n',
                        '@Indent_No': 'n',
                        '@Indent_Exec': 'n',
                        '@Indent_Weight': 0,
                        '@Part_No': 'n',
                        '@Pcs': 0,
                        '@User_ID': 'DEL001',
                        '@Crud': 'R'
                    }
                }),
                'proc': 'IndentMasterCrud'
            });

            $http.post('/App/getData', param).then(function (response) {
                var data = response.data;
                $scope.indentNo = data[0].Indent_No;
                $scope.custCode = data[0].Customer_Code;
                $scope.custName = data[0].CUSTOMER_NAME;
                $scope.executive = data[0].Indent_Exec;
                $scope.weight = data[0].Indent_Weight;
                $scope.data = data[0].Indent_date;
                
                var detparam = JSON.stringify({
                    'param': JSON.stringify({
                        data: {
                            '@Sr_No': 0,
                            '@Customer_Code': 'n',
                            '@Indent_date': 'n',
                            '@Indent_No': data[0].Indent_No,
                            '@Indent_Exec': 'n',
                            '@Indent_Weight': 0,
                            '@Part_No': 'n',
                            '@Pcs': 0,
                            '@User_ID': 'DEL001',
                            '@Crud': 'S'
                        }
                    }),
                    'proc': 'IndentMasterCrud'
                });

                $http.post('/App/getData', detparam).then(function (resp) {
                    var data = resp.data;
                    console.log(data);
                    $scope.details = data;
                    $scope.table = false;
                    $scope.tblDetails = true;
                });
            });

        }
        
        $scope.updateDetails = function () {
            //$resource('/App/GenerateDocument').get();
            //$http({ method: 'POST', url: '/App/GenerateDocument', headers: {'Content-Type':'application/download'} }).then(function () {

            //})
            var detparam = JSON.stringify({
                'param': JSON.stringify({
                    data: {
                        '@Sr_No': 0,
                        '@Customer_Code': 'n',
                        '@Indent_date': 'n',
                        '@Indent_No': '',
                        '@Indent_Exec': 'n',
                        '@Indent_Weight': 0,
                        '@Part_No': 'n',
                        '@Pcs': 0,
                        '@User_ID': 'DEL001',
                        '@Crud': 'S'
                    }
                }),
                'proc': 'IndentMasterCrud'
            });
            window.open('/App/GenerateDocument?param=' + detparam + '', "_blank");
        }

        $scope.indexOfItem = function (v) {
            return $scope.searchData.indexOf(v)
        }

        $(document).on('panel-refresh', '.panel', function (e, panel) {

            // perform any action when a .panel triggers a the refresh event
            init(panel);

        });
}])