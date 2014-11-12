angular.module('archuploadApp')
    .directive('fullHeight', function($window) {
        return {
            restrict: 'EA',
            link: function(scope, element) {

                var headerAndFooter = 29;
                scope.initializeWindowSize = function() {
                    $(element).css('min-height', $window.innerHeight - headerAndFooter);
                };
                scope.initializeWindowSize();
                angular.element($window).bind('resize', function() {
                    scope.initializeWindowSize();
                });
            }
        };
    })
    .directive('fill', function($window) {
        return {
            restrict: 'EA',
            link: function(scope, element) {


                scope.initializeWindowSize = function() {
                    $(element).css('min-height',  ($(window).height() - $(element).offset().top) - 29);

                };
                scope.initializeWindowSize();
                angular.element($window).bind('resize', function() {
                    scope.initializeWindowSize();
                });
            }
        };
    })
