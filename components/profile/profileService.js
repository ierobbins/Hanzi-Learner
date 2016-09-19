angular.module("hanziLearner")
  .service("profileSrv", function($state, mainSrv){

    var users = [
      {
        userName: "GinPickle",
        email: "iedwardrobbins@gmail.com",
        password: "hunter2",
        userImage: "./components/img/hqdefault.jpg",
        mastered: [
          {"character":"的", "seen": 25, "correct":23, "time":"2016-09-17"},
          {"character":"一", "seen": 31, "correct":27, "time":"2016-09-15"},
          {"character":"是", "seen": 20, "correct":19, "time":"2016-09-14"},
          {"character":"旦", "seen": 14, "correct":14, "time":"2016-09-18"},
          {"character":"不", "seen": 12, "correct":12, "time":"2016-09-12"},
          {"character":"了", "seen": 15, "correct":13, "time":"2016-09-12"}
        ],
        learning: [
          {"character":"子", "seen": 17, "correct":9, "time":"2016-09-17"},
          {"character":"人", "seen": 14, "correct":6, "time":"2016-09-17"},
          {"character":"我", "seen": 9, "correct":7, "time":"2016-09-17"},
          {"character":"他", "seen": 3, "correct":2, "time":"2016-09-17"},
          {"character":"个", "seen": 14, "correct":8, "time":"2016-09-17"},
          {"character":"来", "seen": 16, "correct":4, "time":"2016-09-17"},
          {"character":"们", "seen": 32, "correct":2, "time":"2016-09-17"},
          {"character":"中", "seen": 12, "correct":6, "time":"2016-09-17"},
          {"character":"大", "seen": 14, "correct":6, "time":"2016-09-17"},
          {"character":"玉", "seen": 10, "correct":7, "time":"2016-09-17"},
          {"character":"至", "seen": 11, "correct":9, "time":"2016-09-17"},
          {"character":"尤", "seen": 32, "correct":0, "time":"2016-09-17"}
        ]
      }
    ];

    var currentUser = {};

    this.getCurrentUser = function(){
      return currentUser;
    }

    this.setCurrent = function(initUser){
      for(var i = 0; i < users.length; i++){
        if(initUser === users[i].userName){
          currentUser = users[i];
        }
      }
    }



    this.characters = mainSrv.getCharacters();

    this.constructReview = function(type){
      var rand = 0, revQuiz = [];
      if(currentUser[type].length > 10){
        while(revQuiz.length < 10){
          rand = Math.floor(Math.random() * currentUser[type].length);
          var flag = true;
          for(var j = 0; j < revQuiz.length; j++){
            if(revQuiz[j].character === currentUser[type][rand].character){
              flag = false;
            }
          }
          if(flag){
            revQuiz.push(this.findChar(currentUser[type][rand].character));
          }
        }
        return revQuiz;
      }
      return currentUser[type];
    }

    this.findChar = function(initChar){
      for(var i = 0; i < this.characters.length; i++){
        if(this.characters[i].character === initChar){
          return this.characters[i];
        }
      }
    }

    this.reviewStuff = function(revSet){
      console.log("from service", revSet);
      $state.go("quiz", {revQuiz: revSet})
    }

    this.getUsers = function(){
      return users;
    }

    this.logIn = function(initUserID, initPass){
      var logInUser = {};
      if(this.checkUserName(initUserID) !== null){
        logInUser = this.checkUserName(initUserID);
      } else if (this.checkEmail(initUserID) !== null) {
        logInUser = this.checkEmail(initUserID);

      } else {
        return null;
      }
      return (logInUser.password === initPass) ? logInUser : null;
    }

    this.checkEmail = function(initEmail){
      users.forEach(function(item){
        return (initEmail === item.email) ? item : null;
      });
    }

    this.checkUserName = function(initUserName){
      for(var i = 0; i < users.length; i++){
        if(initUserName === users[i].userName){
          return users[i];
        }
      }
      return null;
    }

    this.newUser = function(initUserName, initEmail, initPass){
      users.push({
        userName: initUserName,
        email: initEmail,
        password: initPass,
        userImage: "",
        mastered: [],
        learning: []
      });
    }

  });
