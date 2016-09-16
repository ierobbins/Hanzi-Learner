angular.module("hanziLearner")
  .directive("quizDirective", function(){
    return{
      restrict: "E",
      templateUrl: "./components/quiz/quizDir.html",
      scope:{
        question: "=",
        randPin: "=",
        randDef:"=",
        tempQuiz: "=",
        qIndex: "=",
        checkPinState: "&",
        checkDefState: "&",
        checkCorrectState: "&",
        checkIncorrectState: "&",
        checkAnswer: "&",
        checkFinishedState: "&",
        passNewChar: "&"
      },
      link: function(scope, element, attrs){

      }
    }
  });
