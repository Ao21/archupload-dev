'use strict';

/* Controller Setup
  $scope.formQuestions = [{
        question:'What is your unikey?',
        type: 'text',
        model: '$parent.$parent.$parent.form.unikey',
        stepType: 'input'
    },
    {
        question:'What is your student number?',
        type: 'text',
        model: '$parent.$parent.$parent.form.studentNo',
        stepType: 'input'
    },
    {
        question:'Check',
        stepType:'button',
        type: 'text',
        action:'submit()'

    }]

  */


  /* View Setup
    <stepform class="">
      <step ng-repeat="item in formQuestions track by $index" question="{{item.question}}" tq="{{formQuestions.length-1}}" steptype="{{item.stepType}}" type="{{item.type}}" model="{{item.model}}" index="{{$index}}" action="{{item.action}}" ng-class="{active: $index == currentQuestion}"  class="step-question-{{$index}}"></step>
      <h1 style="display:none;">{{currentQuestion}}</h1>
      <h1 style="display:none;">{{form.unikey}}</h1>
      <h1 style="display:none;">{{form.studentNo}}</h1>

    </stepform>
  */

angular.module('archuploadApp')
  .directive('stepform', function () {
    return {
      templateUrl: 'components/stepform/stepform.html',
      restrict: 'EA',
      replace:true,
      controller: 'UploadCtrl',
      transclude:true,
      link: function (scope, element, attrs) {
      	scope.currentQuestion = 0;
      	//scope.totalQuestions = angular.element(element).find('.step').length - 1;
      	
      }
    };
  })
  .directive('step', function ($timeout) {
    return {
      templateUrl: 'components/stepform/step.html',
      restrict: 'EA',
      require:'^stepform',
      transclude:true,
      replace:true,
      scope:{
      	question:'@',
      	type:'@',
      	stepType:"@",
      	model:'@',
      	tq:'@',
      	action:'@',
      	index:'@',
      },
      link: function (scope, element, attrs) {
      	scope.question = attrs.question;
      	scope.type = attrs.type;
      	scope.mod = attrs.mod;
      	scope.action = attrs.action;
      	scope.tq = attrs.tq;
      	scope.steptype = attrs.steptype;

      

      	




		scope.nextQuestion = function(){
			//angular.element('.step-question-'+scope.$parent.$parent.currentQuestion).addClass('animate-out-left');

      		scope.$parent.$parent.currentQuestion= scope.$parent.$parent.currentQuestion+1;
      		//angular.element('.step-question-'+scope.$parent.$parent.currentQuestion+1).addClass('animate-in-right');
      	}
      	scope.lastQuestion = function(){
      		scope.$parent.$parent.currentQuestion= scope.$parent.$parent.currentQuestion-1;
      	}
      	scope.submit = function(){
      		
      		console.log(scope.$parent.$parent.$parent.submitForm());
      		//scope.$parent.$parent.currentQuestion= scope.$parent.$parent.currentQuestion+1;
      	}

      }
    };
  })
  .directive('ngBindModel',function($compile){
      return{
        link:function(scope,element,attr){
          element[0].removeAttribute('ng-bind-model');
          element[0].setAttribute('ng-model',scope.$eval(attr.ngBindModel));
          $compile(element[0])(scope);
        }
      };
    })
  .directive('ngBindAction',function($compile){
      return{
        link:function(scope,element,attr){
          element[0].removeAttribute('ng-bind-action');
          element[0].setAttribute('ng-click',scope.$eval(attr.ngBindAction));
          $compile(element[0])(scope);
        }
      };
    })




    angular.module('archuploadApp').directive("randomClass", function () {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, elem, attr) {     

 
            //Add random background class to selected element
            elem.addClass('pop-open-colour-'+Math.floor((Math.random()*18)+1));
            //elem.addClass(scope.ngClasses[Math.floor(Math.random() * (scope.ngClasses.length))]);
        }
    }
});