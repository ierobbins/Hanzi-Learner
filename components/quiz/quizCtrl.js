angular.module("hanziLearner")
  .controller("quizCtrl", function($scope, $stateParams, quizSrv, profileSrv, hanziSrv){

    $scope.test = "QUIZ";

    $scope.quizLevel = [{"level": 1}, {"level": 2}, {"level": 3}, {"level": 4}, {"level": 5}, {"level": 6}];

    // * * * * * FOR TOGGLING THE QUIZ VIEW * * * * * //
    $scope.quizToggle = true;

    $scope.toggleQuiz = function(){
      this.quizToggle = !this.quizToggle;
    }
    // * * * * * FOR TOGGLING THE QUIZ VIEW * * * * * //


    // * * * * * IF QUIZ IS CALLED FROM THE REVIEW SECTION * * * * *//
    if($stateParams.revQuiz){
      $scope.toggleQuiz();
      $scope.newQuiz = $stateParams.revQuiz;
      $scope.tempQuiz = $scope.newQuiz;
      $scope.question = $scope.tempQuiz[0];
      $scope.qIndex = 0;
      console.log($scope.question);
      $scope.randPin = quizSrv.genRandPinyin($scope.question);
      $scope.randDef = quizSrv.genRandDef($scope.question);
      answerProg = 0;
    }


    $scope.playSound = function(initChar){
      hanziSrv.getCharSound(initChar)
        .then(function(sound){
          sound.play();
        });
    }


    $scope.makeNewQuiz = function(initLevel){
      $scope.newQuiz = quizSrv.createNewTest(initLevel);
      $scope.tempQuiz = $scope.newQuiz;
      $scope.question = $scope.tempQuiz[0];
      $scope.qIndex = 0;
      $scope.randPin = quizSrv.genRandPinyin($scope.question);
      $scope.randDef = quizSrv.genRandDef($scope.question);
      answerProg = 0;
    }


    //TRACKS THE ANSWER PROGRESSION. STATE 0 SHOWS PINYIN MULT CHOICE. STATE 1 SHOWS DEF MULT CHOICE. STATE 2 SHOWS CORRECT WHOLE CHAR. STATE 3 SHOWS INCORRECT WHOLE CHAR
    var answerProg = 0;
    $scope.checkAnswer = function(initAnswer){

      if(answerProg === 0){
        if(initAnswer === $scope.question.pinyin[0]){
          answerProg = 1;
        } else {
          answerProg = 3
        }
      }
      else if(answerProg === 1){
        if(initAnswer === $scope.question.definition){
          answerProg = 2;
        } else {
          answerProg = 3
        }
      }
    }



    //LOOPS THROUGH CHARS IN TEMPQUIZ. DROPS TEMP-QUIZ ELEMENTS WITH MORE THAN TWO CORRECT.
    $scope.passNewChar = function(){

      //TRIMS OUT TEMP-QUIZ ELEMENTS THAT HAVE ALREADY BEEN CHOSEN CORRECTLY TWO TIMES
      if($scope.tempQuiz.length > 0){

        //UPDATES THE CORRECT PROPERTY OF THE QUIZ ELEMENTS
        if(answerProg === 2){
          if($scope.tempQuiz[$scope.qIndex].hasOwnProperty("correct")){
            $scope.tempQuiz[$scope.qIndex].correct++;
          } else {
            $scope.tempQuiz[$scope.qIndex].correct = 1;
          }
          quizSrv.saveQuizResults($scope.question, true);
        }
        if(answerProg === 3){
          if(!$scope.tempQuiz[$scope.qIndex].hasOwnProperty("correct")){
            $scope.tempQuiz[$scope.qIndex].correct = 0;
          }
          quizSrv.saveQuizResults($scope.question, false);
        }
        $scope.tempQuiz = quizSrv.quizTracker($scope.tempQuiz);
        if($scope.tempQuiz.length === 0){
          answerProg = 4;
        }
        else{
          if($scope.qIndex >= $scope.tempQuiz.length - 1){
            $scope.qIndex = 0;
          } else {
            $scope.qIndex++
          }
          $scope.question = $scope.tempQuiz[$scope.qIndex];
          $scope.randPin = quizSrv.genRandPinyin($scope.question);
          $scope.randDef = quizSrv.genRandDef($scope.question);

          answerProg = 0;
        }
      }
      $scope.quizLength = $scope.tempQuiz.length;
    }

    //THESE FUNCTIONS CHECK THE CURRENT STATE OF THE QUESTION PROCESS AND RETURN TRUE OR FALSE
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

    $scope.checkFinishedState = function(){
      return answerProg === 4;
    }

    $scope.currentUser = profileSrv.getCurrentUser();
  });
