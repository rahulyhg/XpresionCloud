app.controller('userController', ['$rootScope', '$scope', '$timeout', '$http', '$window', '$timeout', '$filter', 'Session', 'focus',
function ($rootScope, $scope, $timeout, $http, $window, $timeout, $filter, Session, focus) {
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
    var init = function (panel) {
        var param = JSON.stringify({
            'param': JSON.stringify({
                data: {
                    '@Vehicle_No': '',
                    '@Vehicle_Type': '',
                    '@Loc': '',
                    '@crud':'R'
                }
            }),
            'proc': 'VehicleMast_Crud'
        })
        $http.post('/App/getData', param).then(function (response) {
            var data = response.data;
            $scope.searchData = data;
            $scope.filtered = data;
            $scope.total = data.length;
            if (panel) panel.removeSpinner();
        })
    }

    init();

    $scope.indexOfItem = function (v) {
        return $scope.searchData.indexOf(v)
    }
}]);