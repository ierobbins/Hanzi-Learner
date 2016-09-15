angular.module("hanziLearner")
  .controller("quizCtrl", function($scope, quizSrv, profileSrv){

    $scope.test = "QUIZ";

    $scope.quizLevel = [{"level": 1}, {"level": 2}, {"level": 3}, {"level": 4}, {"level": 5}, {"level": 6}];

    $scope.quizToggle = true;

    $scope.toggleQuiz = function(){
      this.quizToggle = !this.quizToggle;
    }

    $scope.makeNewQuiz = function(initLevel){
      $scope.newQuiz = quizSrv.createNewTest(profileSrv.getUsers()[0], initLevel);
    }

  });
