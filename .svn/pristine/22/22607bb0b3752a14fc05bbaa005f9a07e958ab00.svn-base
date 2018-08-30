(function () {
    'use strict';
    app.directive('datePicker', function () {
        return {
            restrict: 'A',
            require : "ngModel",
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$setViewValue(moment(new Date()).format("DD/MM/YYYY"));
                $(element).inputmask({
                    'mask': '99/99/9999'
                });
                var dtp = $(element).datetimepicker({
                    'format': 'DD/MM/YYYY',
                    'showClose':true,
                    'showTodayButton': true,
                    'showClear':true,
                    'defaultDate': new Date(),
                    'keyBinds': {
                        enter: function () {
                            this.preventDefault();
                        }
                    }
                });
                dtp.on('dp.change', function (e) {
                    ngModelCtrl.$setViewValue(moment(e.date).format("DD/MM/YYYY"));
                    scope.$apply();
                })
            }
        }
    });
    
})()