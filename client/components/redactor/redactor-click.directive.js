  angular.module('archuploadApp')
      .directive("redactorClick", ['$timeout', function($timeout) {
          return {
              restrict: 'EA',
              require: "ngModel",
              templateUrl: 'components/redactor/redactor-click.html',
              scope:{
                ngModel:'='
              },
              link: function(scope, element, attrs, ngModel) {

                scope.redactorSaveHidden = true;
                  
                  $timeout(function() {
                              scope.content = ngModel.$viewValue;
                          });

                  var updateModel = function updateModel(value) {
                          scope.$apply(function() {
                              ngModel.$setViewValue(value);
                          });
                      },
                      options = {
                          changeCallback: updateModel
                      },
                      additionalOptions = attrs.redactor ?
                      scope.$eval(attrs.redactor) : {},
                      editor,
                      
                      $_element = angular.element(element).find('#redactor');

                  angular.extend(options, additionalOptions);


                  scope.loadRedactor = function() {
                    scope.redactorSaveHidden = false;
                      $_element.redactor({
                          iframe: true,
                          minHeight: 100
                          
                      });

                      ngModel.$render();
                  }

                  scope.$parent.regenerateRedactor = function(){
                    $timeout(function() {
                              scope.content = ngModel.$viewValue;
                          });
                  }


                  scope.saveRedactor = function() {
                      // save content if you need

                      var html = $_element.redactor('get');

                      

                      $timeout(function() {
                        scope.$apply(function(){
                          ngModel.$setViewValue(html);
                          scope.$parent.updateProject();
                        })
                              
                          });


                                            
                      $_element.redactor('destroy');
                      scope.redactorSaveHidden = true;
                  }

                  ngModel.$render = function() {
                      if (angular.isDefined(editor)) {
                          $timeout(function() {
                              $_element.redactor('set', ngModel.$viewValue || '');
                          });
                      }
                  };



              }
          }

      }]);
