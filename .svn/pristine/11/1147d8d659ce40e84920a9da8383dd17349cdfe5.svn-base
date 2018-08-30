app.directive('numberOnly', function () {
    return {
        restrict:'A',
        link: function (scope, element, attrs) {
            //$(element).keypress(function (e) {
            //    console.log(e.which);
            //    if (e.which >= 46 && e.which <= 57) {

            //    } else {
            //        e.preventDefault();
            //    }
            //});
            var re = RegExp('[0-9]');
            var exclude = /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;
            $(element).keypress(function (e) {
                if (!exclude.test(e.key) && !re.test(e.key)) {
                    e.preventDefault();
                }
            });
        }
    };
})