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
      $scope.tempQuiz = $scope.newQuiz;
      $scope.question = $scope.tempQuiz[0];
      $scope.qIndex = 0;
      $scope.randPin = quizSrv.genRandPinyin($scope.question);
      $scope.randDef = quizSrv.genRandDef($scope.question);
      answerProg = 0;
    }


    //LOOPS THROUGH CHARS IN TEMPQUIZ. DROPS TEMPQUIZ ELEMENTS WITH MORE THAN TWO CORRECT.
    $scope.passNewChar = function(){
      if($scope.tempQuiz.length > 0){
        $scope.tempQuiz = quizSrv.quizTracker($scope.tempQuiz);
        if($scope.qIndex >= $scope.tempQuiz.length){
          $scope.qIndex = 0;
        } else {
          $scope.qIndex++
        }
        $scope.question = $scope.tempQuiz[$scope.qIndex];
        $scope.randPin = quizSrv.genRandPinyin($scope.question);
        $scope.randDef = quizSrv.genRandDef($scope.question);
      }
      //TODO end the quiz somehow.......
      answerProg = 4;
    }

    //TRACKS THE ANSWER PROGRESSION. STATE 0 SHOWS PINYIN MULT CHOICE. STATE 1 SHOWS DEF MULT CHOICE. STATE 2 SHOWS CORRECT WHOLE CHAR. STATE 3 SHOWS INCORRECT WHOLE CHAR
    var answerProg = 0;
    $scope.quizProgression = function(initAnswer){
      if(answerProg === 0){
        if(initAnswer === question.pinyin){
          answerProg = 1;
        } else {
          answerProg = 3;
        }
      }
      else if(answerProg === 1){
        if(initAnswer === question.definition){
          answerProg = 2;
        } else {
          answerProg = 3;
        }
      }
    }

    $scope.checkPinState = function(){
      return answerProg === 0;
    }

    $scope.checkDefState = function(){
      return answerProg === 1;
    }

    $scope.checkCorrectState = function(){
      return answerProg === 2;
    }

    $scope.checkIncorrectState = function(){
      return answerProg === 3;
    }



  });
