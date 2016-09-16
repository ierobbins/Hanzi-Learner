angular.module("hanziLearner")
  .service("quizSrv", function(profileSrv, mainSrv){

    this.characters = mainSrv.getCharacters();

    this.createNewTest = function(initUser, initLevel){

      var availableChar = mainSrv.getCharacters().filter(function(item){
        if(item.hskLevel == initLevel){return item;}
      });

      var valuesToFilter = initUser.mastered.concat(initUser.learned).forEach(function(item){
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

      var newQuiz = [], user = initUser, rand = 0, chosenChar = {}, flag = true;

      while(newQuiz.length < 10 && availableChar.length >= 10){//debugger;
        rand = Math.ceil(Math.random() * (availableChar[availableChar.length - 1].frequencyRank - availableChar[0].frequencyRank) + availableChar[0].frequencyRank);
        console.log(rand);

        for(var j = 0; j < availableChar.length; j++){
          if(availableChar[j].frequencyRank === rand){
            chosenChar = availableChar[j];
          }
        }
        console.log(chosenChar);
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
