'use strict';
app.directive('hasPermission', ['permissions', function (permissions) {
    return {
        link: function (scope, element, attrs) {
            if (!_.isString(attrs.hasPermission)) {
                throw 'hasPermission value must be a string'
            }

            var value = attrs.hasPermission.trim();
            var notPermissionFlag = value[0] === '!';
            if (notPermissionFlag) {
                value = value.slice(1).trim();
            }


        }
    }
}]);