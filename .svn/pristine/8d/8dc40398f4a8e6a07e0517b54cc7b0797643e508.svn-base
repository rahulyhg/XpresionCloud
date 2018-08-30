(function () {
    app.filter('startFrom', function () {
        return function (input, currentPage, pageSize) {
            if (input) {
                var start = (currentPage - 1) * pageSize;
                var end = currentPage * pageSize;
                start = +start;
                return input.slice(start);
            }
        }
    });
})()