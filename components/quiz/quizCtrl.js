angular.module("hanziLearner")
  .controller("quizCtrl", function($scope){
    $scope.test = "QUIZ";
    $scope.quizToggle = true;
    $scope.toggleQuiz = function(){
      this.quizToggle = !this.quizToggle;
    }
  });
