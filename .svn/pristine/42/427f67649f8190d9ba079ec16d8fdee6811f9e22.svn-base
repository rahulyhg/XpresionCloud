app.controller('userController', ["$state", "$scope", "AuthService", function ($state, $scope, AuthService) {
    //$scope.userName = 'Rv';
    $scope.userName = $scope.session.user;
    $scope.logout = function () {
        //sessionStorage.removeItem('isLogged');
        AuthService.logout();
        $state.go('login.signin');
    }
}])