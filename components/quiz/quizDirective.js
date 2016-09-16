angular.module("hanziLearner")
  .directive("quizDirective", function(quizService){
    return{
      restrict: "E",
      template: '<div class="quiz-char-block"><h1>{{time}}</h1></div>' +
                '<div class="quiz-multiple-choice">' +
                  '<ul>' +
                    '<li ng-repeat="choice in choices"></li>' +
                  '</ul>' +
                '</div>'
      ,
      link: function(scope, element, attrs){

      }
    }
  });
