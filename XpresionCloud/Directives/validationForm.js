(function () {
    'use strict';
    app.directive('validationForm', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                elem.bind('keydown', function (e) {
                    var code = e.keyCode || e.which;
                    if (code == 13) {
                        var input = elem[0].querySelectorAll('input:not([type="hidden"]):not([disabled]), select, textarea, button:not([type="hidden"])');
                        var el = e.srcElement || e.target;
                        var focusNext = false;
                        var len = input.length;
                        e.preventDefault();
                        for (var i = 0; i < len; i++) {
                            var pe = input[i];
                            if (focusNext) {
                                if (pe.style.display !== 'none') {
                                    angular.element(pe).focus();
                                    break;
                                }
                            } else if (pe === el) {
                                focusNext = true;
                            }
                        }
                    }
                })
                elem.on('submit', function () {
                    var firstInvalid = elem[0].querySelector('.ng-invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                });
            }
        }
    });
})()