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
        checkIncorrectState: "&",
        checkAnswer: "&",
        checkFinishedState: "&"
      },
      link: function(scope, element, attrs){

      }
    }
  });
