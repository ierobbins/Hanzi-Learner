angular.module("hanziLearner")
  .directive("quizDirective", function(){
    return{
      restrict: "E",
      templateUrl: "./components/quiz/quizDir.html",
      scope:{
        question: "=",
        randPin: "=",
        randDef:"=",
        checkPinState: "&",
        checkDefState: "&",
        checkCorrectState: "&",
      },
      link: function(scope, element, attrs){

      }
    }
  });
