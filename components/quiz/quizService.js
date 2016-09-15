angular.module("hanziLearner")
  .service("quizSrv", function(profileSrv, mainSrv){

    this.characters = mainSrv.getCharacters();

    this.createNewTest = function(initUser, initLevel){

      console.log(initLevel);
      var availableChar = mainSrv.getCharacters().filter(function(item){
        if(item.hskLevel == initLevel){return item;}
      });

      console.log("AVAILABLE: ", availableChar)
      var valuesToFilter = initUser.mastered.concat(initUser.learned).forEach(function(item){
        if(item !== undefined){
          return item.frequencyRank;
        }
      });

      console.log("FROM master+learn: ", initUser.mastered.concat(initUser.learned))
      console.log("FROM vals to fileter: ", valuesToFilter);
      availableChar = availableChar.filter(function(item){
        if(valuesToFilter !== undefined && valuesToFilter.indexOf(item.frequencyRank) === -1){
          return item;
        }
      });

      var newQuiz = [], user = initUser, rand = 0, chosenChar = {}, flag = true;

      while(newQuiz.length < 10 && availableChar.length >= 10){
        rand = Math.ceil(Math.random() * (availableChar[availableChar.length - 1] - availableChar[0]) + availableChar[0]);
        chosenChar = availableChar.forEach(function(item){
          if(item.frequencyRank === rand){
            return item;
          }
        });
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
          newQuiz.push(item);
        })
      }
      console.log("FROM QUIZ SERVICE: ", newQuiz);
      return newQuiz;
    }




  });
