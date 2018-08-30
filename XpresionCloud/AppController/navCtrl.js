app.controller('navCtrl', ["$state", "$scope", "$http", "$rootScope", "navigation", function ($state, $scope, $http, $rootScope, navigation) {
    $scope.navigation = navigation.get();
}])