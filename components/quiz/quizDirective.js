angular.module("hanziLearner")
  .directive("quizDirective", function(){
    return{
      restrict: "E",
      templateUrl: "./components/quiz/quizDir.html",
      scope:{
        question: "=",
        randPin: "=",
        randDef:"=",
        quizLength: "=",
        qIndex: "=",
        checkPinState: "&",
        checkDefState: "&",
        checkCorrectState: "&",
        checkIncorrectState: "&",
        checkAnswer: "&",
        checkFinishedState: "&",
        passNewChar: "&",
        playSound: "&",
        makeNewQuiz: "&"
      },
      link: function(scope, element, attrs){

      }
    }
  });
