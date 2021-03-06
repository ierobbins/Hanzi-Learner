angular.module("hanziLearner")
  .service("quizSrv", function(profileSrv, mainSrv){

    this.characters = mainSrv.getCharacters();

    var currentUser = profileSrv.getCurrentUser();

    var currentQuiz = [];

    //* * * * * TRIMS ALL ELEMENTS FROM QUIZ THAT HAVE BEEN ANSWERED CORRECTLY TWICE * * * * * //
    this.quizTracker = function(currQuiz){
      console.log("Service: quizTracker");
      currQuiz.forEach(function(item, index){
        if(item.correct >= 2){
          currQuiz.splice(index, 1);
        }
      });
      return currQuiz;
    }

    //SAVES QUIZ RESULTS AFTER EVERY ANSWER DURING THE QUIZ. UPDATES INSTANTLY
    this.saveQuizResults = function(char, correctAnswer){
      console.log("Service: saveQuizResults");
      var correctAns = 0;
      if(correctAnswer){
        correctAns = 1;
      }

      //CHECKS IF CURRENT CHARACTER IS ALREADY MASTERED AND UPDATES STATS
      if(currentUser.mastered.length > 0){
        currentUser.mastered.forEach(function(item){
          if(item.character === char.character){
            item.seen++;
            item.correct += correctAns;
            item.time = new Date().toISOString().substring(0, 10);
          }
        });
      }

      //CHECKS IF CURRENT CHARACTER HAS ALREADY BEEN SEEN AND UPDATES STATS
      var inLearning = true;
      currentUser.learning.forEach(function(item, index){
        if(item.character === char.character){
          inLearning = false;
          item.seen++;
          item.correct += correctAns;
          item.time = new Date().toISOString().substring(0, 10);
          if(item.correct >= 10){                                  //Character is moved into the users
            currentUser.mastered.push(item);                         //mastered array after 10 correct answers.
            currentUser.learning.splice(index, 1);
          }
        }
      });

      //IF CHARACTER IS NOT IN LEARNING OR MASTERED, THEN IT IS PUSHED INTO LEARNING
      if(inLearning){
        currentUser.learning.push({
          character: char.character,
          seen: 1,
          correct: correctAns,
          time: new Date().toISOString().substring(0, 10)
        });
      }
    }

    //CREATES NEW QUIZ BASED ON USER INFORMATION AND CHOSEN LEVEL
    this.createNewTest = function(initLevel){
      console.log("Service: createNewQuiz");
      currentUser = profileSrv.getCurrentUser();
      var availableChar = mainSrv.getCharacters().filter(function(item){
        if(item.hskLevel == initLevel){return item;}
      });
      var valuesToFilter = currentUser.mastered.concat(currentUser.learning).forEach(function(item){
        if(item){
          return item.frequencyRank;
        }
      });
      if(valuesToFilter){
        availableChar = availableChar.filter(function(item){
          if(valuesToFilter.indexOf(item.frequencyRank) === -1){
            return item;
          }
        });
      }

      var newQuiz = [], user = currentUser, rand = 0, chosenChar = {}, flag = true;

      while(newQuiz.length < 10 && availableChar.length >= 10){
        rand = Math.ceil(Math.random() * (availableChar[availableChar.length - 1].frequencyRank - availableChar[0].frequencyRank) + availableChar[0].frequencyRank);

        for(var j = 0; j < availableChar.length; j++){
          if(availableChar[j].frequencyRank === rand){
            chosenChar = availableChar[j];
          }
        }
        flag = true;
        for(var i = 0; i < newQuiz.length; i++){
          if(chosenChar.frequencyRank === newQuiz[i].frequencyRank){
            flag = false;
          }
        }
        if(flag) {newQuiz.push(chosenChar);}
      }

      if(availableChar.length < 10){
        availableChar.forEach(function(item){
          item.correct = 0;
          newQuiz.push(item);
        })
      }
      currentQuiz = newQuiz;
      return newQuiz;
    }

    //RETURNS AN ARRAY WITH ONE CORRECT ANSWER AND 4 RANDOMLY PULLED PINYIN ANSWERS
    this.genRandPinyin = function(initChar){
      console.log("Service: getRandPin");
      var soundArr = [];
      var correctAnswer = initChar.pinyin[0];
      var rand = 0;
      while(soundArr.length < 4){
        rand = Math.ceil(Math.random() * this.characters.length);
        if(soundArr.indexOf(this.characters[rand].pinyin[0]) === -1 && this.characters[rand].pinyin[0] && this.characters[rand].pinyin[0] !== correctAnswer){
          soundArr.push(this.characters[rand].pinyin[0]);
        }
      }
      rand = Math.floor(Math.random() * 4);
      soundArr.splice(rand, 0, correctAnswer)
      return soundArr;
    }

    //RETURNS AN ARRAY WITH ONE CORRECT ANSWER AND 4 RANDOMLY PULLED DEFINITION ANSWERS
    this.genRandDef = function(initChar){
      console.log("Service: getRandDef");
      var defArr = [];
      var correctAnswer = initChar.definition;
      var rand = 0;
      while(defArr.length < 4){
        rand = Math.ceil(Math.random() * this.characters.length);
        if(defArr.indexOf(this.characters[rand].definition) === -1 && this.characters[rand].definition && this.characters[rand].definition !== correctAnswer){
          defArr.push(this.characters[rand].definition);
        }
      }
      rand = Math.floor(Math.random() * 4);
      defArr.splice(rand, 0, correctAnswer)
      return defArr;
    }
  });
