'use strict';
/**
 * Clip-Two Main Controller
 */
app.controller('AppCtrl', ['$rootScope', '$scope', '$state', '$swipe', '$translate', '$localStorage', '$window', '$document', '$timeout', 'cfpLoadingBar', 'Fullscreen', 'AuthService', "AUTH_EVENTS","Session","SweetAlert","deviceDetector",
function ($rootScope, $scope, $state, $swipe, $translate, $localStorage, $window, $document, $timeout, cfpLoadingBar, Fullscreen, AuthService, AUTH_EVENTS, Session, SweetAlert, deviceDetector) {

    
    // Loading bar transition
    // -----------------------------------
    var $win = $($window), $body = $('body');

    $scope.horizontalNavbarCollapsed = true;
    $scope.menuInit = function (value) {
        $scope.horizontalNavbarCollapsed = value;
    };
    $scope.menuToggle = function (value) {
        $scope.horizontalNavbarCollapsed = !$scope.horizontalNavbarCollapsed;
    };
    // State Change Start
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.title == 'Login' && AuthService.isLogged()) {
            event.preventDefault();
            return;
        }
        if (toState.authenticate && !AuthService.isLogged() || toState.authenticate == undefined && !AuthService.isLogged()) {
            event.preventDefault();
            $state.go('login.signin');
            $rootScope.$broadcast(AUTH_EVENTS.notAuthonticated);
        } else {
            //start loading bar on stateChangeStart
            cfpLoadingBar.start();
            $scope.horizontalNavbarCollapsed = true;
            if (toState.name == "app.pagelayouts.boxedpage") {
                $body.addClass("app-boxed-page");
            } else {
                $body.removeClass("app-boxed-page");
            }
            if (typeof CKEDITOR !== 'undefined') {
                for (name in CKEDITOR.instances) {
                    CKEDITOR.instances[name].destroy();
                }
            }

            //if (toState.title != 'Login') {
            //    if (fetchSession()) {
            //        event.preventDefault();
            //    }
            //}

        }
        
    });

    // State Change End
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        
        //stop loading bar on stateChangeSuccess
        event.targetScope.$watch("$viewContentLoaded", function () {

            cfpLoadingBar.complete();
        });

        // scroll top the page on change state
        $('#app .main-content').css({
            position: 'relative',
            top: 'auto'
        });

        $('footer').show();

        window.scrollTo(0, 0);

        if (angular.element('.email-reader').length) {
            angular.element('.email-reader').animate({
                scrollTop: 0
            }, 0);
        }

        // Save the route title
        $rootScope.currTitle = $state.current.title;

    });

    // State not found
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        //$rootScope.loading = false;
        //console.log(unfoundState.to);
        // "lazy.state"
        //console.log(unfoundState.toParams);
        // {a:1, b:2}
        //console.log(unfoundState.options);
        // {inherit:false} + default options
        $state.go('error.404');
    });

    var fetchSession = function (e) {
        Session.getSession().then(function (res) {
            if (!isEmpty(res)) {
                $rootScope.session = res;
                return true;
            } else {
                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
                return false;
            }
        });
    }

    //AuthEvent Error
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event) {
        fetchSession();
    });
    // AuthEvent Internal Server Error 500
    $rootScope.$on(AUTH_EVENTS.internalServerError, function (event) {
        $state.go('error.500');
    });
    // AuthEvent Not found 404
    $rootScope.$on(AUTH_EVENTS.notFound, function (event) {
        //$state.go('error.404');
    });
    // AuthEvent No Authorised 403
    $rootScope.$on(AUTH_EVENTS.notAuthorised, function (event) {
        $state.go('error.403');
    });
    // Session Timeout
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function (event) {
        SweetAlert.swal({
            title: 'Session Expired!',
            text: 'Your session has expired, now you\'ll be redirect to login page',
            confirmButtonColor: '#da4f4a',
            closeOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                AuthService.logout();
                $state.go('login.signin');
            };
        });
    });
    // $http request start
    $rootScope.$on('loading:progress', function (v) {
        cfpLoadingBar.start();
        if (AuthService.isLogged()) {
            fetchSession("Start");
        }
    });
    // $http resquest end/error
    $rootScope.$on('loading:finish', function (v) {
        cfpLoadingBar.complete();
    });

    $rootScope.pageTitle = function () {
        return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
    };
    var defaultlayout = $scope.app.defaultLayout;
    // save settings to local storage
    if (angular.isDefined($localStorage.lay)) {
        $scope.app.layout = angular.copy($localStorage.lay);

    }

    $scope.resetLayout = function () {
        $scope.loading_reset = true;
        // start loading
        $timeout(function () {
            delete $localStorage.lay;
            $scope.app.layout = angular.copy($rootScope.app.defaultLayout);
            $scope.loading_reset = false;
            // stop loading
        }, 500);

    };
    $scope.saveLayout = function () {
        $scope.loading_save = true;
        // start loading
        $timeout(function () {
            $localStorage.lay = angular.copy($scope.app.layout);
            $scope.loading_save = false;
            // stop loading
        }, 500);

    };
    $scope.setLayout = function () {

        $scope.app.layout.isNavbarFixed = false;
        $scope.app.layout.isSidebarClosed = false;
        $scope.app.layout.isSidebarFixed = false;
        $scope.app.layout.isFooterFixed = false;
        $scope.app.layout.isBoxedPage = false;

    };

    //global function to scroll page up
    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 600);
    };

    // angular translate
    // ----------------------
    $scope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
            'en': 'English',
            'it_IT': 'Italiano',
            'de_DE': 'Deutsch'
        },
        // display always the current ui language
        init: function () {
            var proposedLanguage = $translate.proposedLanguage() || $translate.use();
            var preferredLanguage = $translate.preferredLanguage();
            // we know we have set a preferred one in app.config
            $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
        },
        set: function (localeId, ev) {
            $translate.use(localeId);
            $scope.language.selected = $scope.language.available[localeId];
            $scope.language.listIsOpen = !$scope.language.listIsOpen;
        }
    };

    $scope.language.init();

    // Fullscreen
    $scope.isFullscreen = false;
    $scope.goFullscreen = function () {
        $scope.isFullscreen = !$scope.isFullscreen;
        if (Fullscreen.isEnabled()) {
            Fullscreen.cancel();
        } else {
            Fullscreen.all();
        }

        // Set Fullscreen to a specific element (bad practice)
        // Fullscreen.enable( document.getElementById('img') )

    };

    // Function to check if session is empty
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var isEmpty = function (obj) {
        // null and undifined are "empty"
        if (obj == null) return true;

        // Assume if it has a lengh property with a non-zero value
        // that property is correct
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        if (typeof obj !== "object") return true;

        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    // Function that find the exact height and width of the viewport in a cross-browser way
    var viewport = function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };
    };
    // function that adds information in a scope of the height and width of the page
    $scope.getWindowDimensions = function () {
        return {
            'h': viewport().height,
            'w': viewport().width
        };
    };
    // Detect when window is resized and set some variables
    $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
        $scope.windowHeight = newValue.h;
        $scope.windowWidth = newValue.w;

        if (newValue.w >= 992) {
            $scope.isLargeDevice = true;
        } else {
            $scope.isLargeDevice = false;
        }
        if (newValue.w < 992) {
            $scope.isSmallDevice = true;
        } else {
            $scope.isSmallDevice = false;
        }
        if (newValue.w <= 768) {
            $scope.isMobileDevice = true;
        } else {
            $scope.isMobileDevice = false;
        }
    }, true);
    // Apply on resize
    $win.on('resize', function () {

        $scope.$apply();
        if ($scope.isLargeDevice) {
            $('#app .main-content').css({
                position: 'relative',
                top: 'auto',
                width: 'auto'
            });
            $('footer').show();
        }
    });
}]);
