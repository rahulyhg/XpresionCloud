'use strict';
/**
 * controller for Messages
 */
app.controller('InboxCtrl', ["$rootScope","$scope", "$state", "$interval","$http","$timeout","SweetAlert",
function ($rootScope, $scope, $state, $interval, $http, $timeout, SweetAlert) {
    $scope.ldloading = {};

    


    
    $scope.$watch($rootScope.errors, function () {
        $scope.scopeVariable = $rootScope.errors.length;
    })

    $scope.errorSubmit = function (style) {
        $scope.ldloading[style.replace('-', '_')] = true;
        
        console.log($scope.errors);
        var param = JSON.stringify({
            'errors': JSON.stringify($scope.errors)
        });
        $http.post('/App/errorReport', param).then(function (response) {
            $scope.ldloading[style.replace('-', '_')] = false;
            var data = response.data;
            if (data) {
                $rootScope.errors = [];
                SweetAlert.swal("Success!", "Error Successfully Reported", "success");
            }
        });
    }
    //var loadMessage = function () {
    //    $scope.messages.push(incomingMessages[$scope.scopeVariable - 1]);
    //    $scope.scopeVariable++;
    //};

    ////Put in interval, first trigger after 10 seconds
    //var add = $interval(function () {
    //    if ($scope.scopeVariable < 4) {
    //        loadMessage();
    //    }
    //}, 10000);

    //$scope.stopAdd = function () {
    //    if (angular.isDefined(add)) {
    //        $interval.cancel(add);
    //        add = undefined;
    //    }
    //};
}]);
app.controller('ViewMessageCrtl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
    function getById(arr, id) {
        for (var d = 0, len = arr.length; d < len; d += 1) {
            if (arr[d].id == id) {

                return arr[d];
            }
        }
    }


    $scope.message = getById($scope.messages, $stateParams.inboxID);

}]);
