angular.module("hanziLearner")
  .controller("quizCtrl", function($scope, quizSrv){

    $scope.test = "QUIZ";

    $scope.quizLevel = ["LEVEL ONE", "LEVEL TWO", "LEVEL THREE", "LEVEL FOUR", "LEVEL FIVE", "LEVEL SIX"];

    $scope.quizToggle = true;

    $scope.toggleQuiz = function(){
      this.quizToggle = !this.quizToggle;
    }

    $scope.makeNewQuiz = function(initLevel){
      $scope.newQuiz = quizSrv.createNewText(initLevel);
    }

  });
