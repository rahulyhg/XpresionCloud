'use strict';
/**
 * controller for Messages
 */
app.factory('chatMessage', ['$firebaseArray', function ($firebaseArray) {
    var ref = firebase.database().ref();
    return $firebaseArray(ref);
}])
app.controller('ChatCtrl', ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {

    $scope.selfIdUser = 'bombino';
    $scope.otherIdUser = 50223456;
    $scope.setOtherId = function (value) {
        //console.log(value);
        $scope.otherIdUser = value;
    };
    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);

    var ref = firebase.database().ref();
    $scope.messages = $firebaseArray(ref);
    var chat = firebase.database().ref("bombino");
    $scope.chat = $firebaseArray(chat);
    
    

    var connectRef = firebase.database().ref('.info/connected');
    connectRef.on('value', function (snap) {
        if (snap.val() === true) {
            console.log('connected');
        }
        else
            console.log('not connected');
    })

    $scope.sendMessage = function () {
        
        if ($scope.chatMessage != '') {
            var newMessage = {
                "user": "Necole",
                "avatar": "assets/images/avatar-2.jpg",
                "date": new Date(),
                "content": $scope.chatMessage,
                "idUser": $scope.selfIdUser,
                "idOther": $scope.otherIdUser
            };
            //$scope.chat.push(newMessage);
            $scope.chat.$add(newMessage);
            $scope.chatMessage = '';
        }
    };
}]);
