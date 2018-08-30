(function () {
    'use strict';
    app.directive('nextFocus', nextFocus);
    function nextFocus() {
        var directive = {
            restrict: 'A',
            link: function ($scope, elem, attrs) {
                elem.bind('keydown', function (e) {
                    if (e.keyCode == 13) {
                        elem.next()[0].focus();
                    }
                })
            }
        };
        return directive;
    };
})();