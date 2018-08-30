app.controller('loginController', ["$rootScope", "$state", "$scope", "$http", "$window", "$filter", "$timeout", "SweetAlert", "cfpLoadingBar", "AuthService", "AUTH_EVENTS","navigation",
function ($rootScope, $state, $scope, $http, $window, $filter, $timeout, SweetAlert, cfpLoadingBar, AuthService, AUTH_EVENTS,navigation) {

    $scope.submit = function () {
        //var param = JSON.stringify({
        //    'param': JSON.stringify({
        //        data: {
        //            '@username': $scope.userid,
        //            '@password':$scope.password
        //        }
        //    }),
        //    'proc': 'login_check'
        //})

        var param = JSON.stringify({
            'apiKey':'b8534ff8-c498-4019-bc3e-233a72d526db',
            'OCSPassword': $scope.password,
            'OCSUsername': $scope.userid,
        })

        AuthService.login(param).then(function (res) {
            if (res.status) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('app.dashboard');
                navigation.set(res.data);
            } else {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticate)
                toast('Error', res.message, 'error');
            }
        })
    }
}]);