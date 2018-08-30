/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    // APPLICATION ROUTES
    // -----------------------------------
    // -----------------------------------

    $urlRouterProvider.when('', '/app/dashboard')
    // For any unmatched url, redirect to /error/404
    $urlRouterProvider.otherwise("/error/404");
    //
    // Set up the states
    // LOGIN 
    $stateProvider.state('login', {
        url: '/login',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        abstract: true
    }).state('login.signin', {
        url: '/signin',
        templateUrl: '/Xpresion/Login',
        title: 'Login',
        authenticate: false,
    })
    // APP
    .state('app', {
        url: "/app",
        templateUrl: "/Xpresion/UI",
        abstract: true,
    }).state('app.dashboard', {
        url: "/dashboard",
        templateUrl: "/Xpresion/Dashboard",
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        },
    })
    // MASTERS
    .state('app.masters', {
        url: "/Masters",
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Masters',
        ncyBreadcrumb: {
            label: 'Masters'
        },
    })
    // MASTERS --> SALES
    .state('app.masters.sales', {
        url: "/Sales",
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Sales',
        ncyBreadcrumb: {
            label: 'Sales'
        },
    }).state('app.masters.sales.zone', {
        url: "/ZoneMaster",
        templateUrl: "/Zone/ZoneIndex",
        title: 'Zone Master',
        ncyBreadcrumb: {
            label: 'Zone Master'
        },
    }).state('app.masters.sales.product', {
        url: "/ProductMaster",
        templateUrl: "/Product/ProductIndex",
        title: 'Product Master',
        ncyBreadcrumb: {
            label: 'Product Master'
        },
    }).state('app.masters.sales.location', {
        url: "/LocationMaster",
        templateUrl: "/Location/LocationIndex",
        title: 'Location Master',
        ncyBreadcrumb: {
            label: 'Location Master'
        },
    }).state('app.masters.sales.country', {
        url: "/CountryMaster",
        templateUrl: "/Country/CountryIndex",
        title: 'Country Master',
        ncyBreadcrumb: {
            label: 'Country Master'
        },
    })
    .state('app.masters.sales.branch', {
        url: "/BranchMaster",
        templateUrl: "/Branch/Index",
        title: 'Branch Master',
        ncyBreadcrumb: {
            label: 'Branch Master'
        },
    }).state('app.masters.sales.vendor', {
            url: "/VendorMaster",
            templateUrl: "/VendorMaster/VendorMasterIndex",
            title: 'Vendor Master',
            ncyBreadcrumb: {
                label: 'Vendor Master'
            },
        })

    // TRANSACTION
    .state('app.tran', {
        url: "/Transaction",
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Transaction',
        ncyBreadcrumb: {
            label: 'Transaction'
        },
    }).state('app.tran.indent', {
        url: "/IndentEntry",
        templateUrl: "/Indent/IndentIndex",
        title: 'Indent Entry',
        ncyBreadcrumb: {
            label: 'Indent Entry'
        },
    })
    // REPORTS
    .state('app.report', {
        url: "/Reports",
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Reports',
        ncyBreadcrumb: {
            label: 'Reports'
        },
    }).state('app.report.scan', {
        url: "/ScanReport",
        templateUrl: "/Report/ScanReport",
        title: 'Scan Report',
        ncyBreadcrumb: {
            label: 'Scan Report'
        },
    }).state('app.report.ops', {
        url: "/OpsReport",
        templateUrl: "/Report/OpsReport",
        title: 'Ops Report',
        ncyBreadcrumb: {
            label: 'Ops Report'
        },
    })

    .state('app.util', {
        url: "/Utility",
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Utility',
        ncyBreadcrumb: {
            label: 'Utility'
        },
    }).state('app.util.user', {
        url: "/UserSetup",
        templateUrl: "/Utility/UserSetup",
        title: 'User Setup',
        ncyBreadcrumb: {
            label: 'User Setup'
        },
    })
    //Error State
    .state('error', {
        url: '/error',
        template: '<div ui-view class="fade-in-right-big smooth"></div>',
        abstract: true
    }).state('error.500', {
        url: "/500",
        templateUrl: "/Xpresion/Error500",
        title: 'Something Went Wrong',
        authenticate: true
    }).state('error.404', {
        url: "/404",
        templateUrl: "/Xpresion/Error404",
        title: 'Page Not Found',
        authenticate: false
    }).state('error.403', {
        url: "/403",
        templateUrl: "/Xpresion/Error403",
        title: 'Forbidden',
        authenticate: false
    })


    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);