angular.module("hanziLearner")
  .controller("quizCtrl", function($scope, quizSrv, profileSrv){

    $scope.test = "QUIZ";

    $scope.quizLevel = [{"level": 1}, {"level": 2}, {"level": 3}, {"level": 4}, {"level": 5}, {"level": 6}];

    $scope.quizToggle = true;

    $scope.toggleQuiz = function(){
      this.quizToggle = !this.quizToggle;
    }

    $scope.passNewChar = function(){
      if($scope.tempQuiz.length > 0){
        $scope.tempQuiz = quizSrv.quizTracker($scope.tempQuiz);
        if($scope.qIndex >= $scope.tempQuiz.length){
          $scope.qIndex = 0;
        } else {
          $scope.qIndex++
        }
        return $scope.question = $scope.tempQuiz[$scope.qIndex];
      }
      //TODO end the quiz somehow.......
      return null;
    }

    $scope.makeNewQuiz = function(initLevel){
      $scope.newQuiz = quizSrv.createNewTest(profileSrv.getUsers()[0], initLevel);
      $scope.tempQuiz = $scope.newQuiz;
      $scope.question = $scope.tempQuiz[0];
      $scope.qIndex = 0;
    }

  });
